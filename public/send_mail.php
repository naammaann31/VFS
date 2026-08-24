<?php
/* ═══════════════════════════════════════════════════════════════
   VECTRA FOREIGN SERVICES — Secure Mail Endpoint
   Security: CORS lock, honeypot, rate-limit, referer check
   Deliverability: HTML email, proper headers, same-domain sender
   ═══════════════════════════════════════════════════════════════ */

// ── 1. CORS — Only allow requests from your own domain ──
$allowed_origins = [
    'https://vectraforeignservices.com',
    'https://www.vectraforeignservices.com',
    'http://vectraforeignservices.com',
    'http://www.vectraforeignservices.com'
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowed_origins)) {
    header("Access-Control-Allow-Origin: $origin");
} else {
    header("Access-Control-Allow-Origin: https://vectraforeignservices.com");
}

header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

// Handle CORS preflight
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(204);
    exit;
}

// ── 2. Only allow POST ──
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
    exit;
}

// ── 3. Referer check — reject requests not from your site ──
$referer = $_SERVER['HTTP_REFERER'] ?? '';
$valid_referers = ['vectraforeignservices.com', 'www.vectraforeignservices.com'];
$referer_host = parse_url($referer, PHP_URL_HOST) ?? '';
if ($referer_host && !in_array($referer_host, $valid_referers)) {
    // Silently reject — don't tell attackers why
    echo json_encode(["success" => true, "message" => "Email sent successfully"]);
    exit;
}

// ── 4. Parse JSON body ──
$data = json_decode(file_get_contents("php://input"), true);
if (!$data || !is_array($data)) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid JSON payload"]);
    exit;
}

// ── 5. Honeypot check — bots fill this hidden field, humans leave it empty ──
if (!empty($data['website'])) {
    // Bot detected — respond with fake success (don't reveal detection)
    echo json_encode(["success" => true, "message" => "Email sent successfully"]);
    exit;
}

// ── 6. Rate limiting — max 5 submissions per IP per 10 minutes ──
$rate_limit_dir = sys_get_temp_dir() . '/vectra_rate_limits';
if (!is_dir($rate_limit_dir)) {
    @mkdir($rate_limit_dir, 0755, true);
}

$client_ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rate_file = $rate_limit_dir . '/' . md5($client_ip) . '.json';
$rate_window = 600; // 10 minutes
$max_requests = 5;

$rate_data = [];
if (file_exists($rate_file)) {
    $rate_data = json_decode(file_get_contents($rate_file), true) ?? [];
}

$now = time();
// Remove entries older than the rate window
$rate_data = array_filter($rate_data, function($timestamp) use ($now, $rate_window) {
    return ($now - $timestamp) < $rate_window;
});

if (count($rate_data) >= $max_requests) {
    http_response_code(429);
    echo json_encode(["error" => "Too many submissions. Please try again in a few minutes."]);
    exit;
}

$rate_data[] = $now;
file_put_contents($rate_file, json_encode(array_values($rate_data)));

// ── 7. Server-side input validation ──
$fullName = trim($data['fullName'] ?? '');
$email    = trim($data['email'] ?? '');
$phone    = trim($data['phone'] ?? '');
$country  = trim($data['country'] ?? '');
$visaType = trim($data['visaType'] ?? '');
$messageTxt = trim($data['message'] ?? '');
$formType = $data['formType'] ?? 'Website Form';

if ($fullName === '' || $email === '' || $phone === '' || $country === '' || $visaType === '' || $messageTxt === '') {
    http_response_code(400);
    echo json_encode(["error" => "All fields in the inquiry form are mandatory."]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid email address."]);
    exit;
}

$cleanPhone = preg_replace('/\D/', '', $phone);
if (strlen($cleanPhone) < 10 || strlen($cleanPhone) > 12) {
    http_response_code(400);
    echo json_encode(["error" => "Phone number must be between 10 and 12 digits."]);
    exit;
}

// ── 8. Build the email ──
$to = "info@vectraforeignservices.com";

// Sanitize subject — strip CRLF to prevent header injection
$safe_form_type = preg_replace('/[\r\n]/', '', $formType);
$subject = "New Inquiry: " . $safe_form_type . " — " . $fullName;

// Build HTML email body — professional layout passes spam filters
$rows = "";
foreach ($data as $key => $value) {
    if ($key === 'formType' || $key === 'consent' || $key === 'website') continue;
    $label = ucfirst(preg_replace('/(?<!^)[A-Z]/', ' $0', $key));
    $safe_value = htmlspecialchars((string)$value, ENT_QUOTES, 'UTF-8');
    $rows .= "<tr>
        <td style='padding:10px 14px;border-bottom:1px solid #eee;color:#555;font-weight:600;width:160px;vertical-align:top;'>$label</td>
        <td style='padding:10px 14px;border-bottom:1px solid #eee;color:#222;'>$safe_value</td>
    </tr>";
}

$message = "
<!DOCTYPE html>
<html>
<head><meta charset='UTF-8'></head>
<body style='margin:0;padding:0;background:#f4f4f7;font-family:Arial,Helvetica,sans-serif;'>
    <table width='100%' cellpadding='0' cellspacing='0' style='background:#f4f4f7;padding:30px 0;'>
        <tr><td align='center'>
            <table width='600' cellpadding='0' cellspacing='0' style='background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);'>
                <!-- Header -->
                <tr>
                    <td style='background:linear-gradient(135deg,#0a1628 0%,#1a2e4a 100%);padding:28px 30px;text-align:center;'>
                        <h1 style='margin:0;color:#d4af37;font-size:20px;font-weight:700;letter-spacing:1px;'>VECTRA FOREIGN SERVICES</h1>
                        <p style='margin:6px 0 0;color:#8899aa;font-size:13px;'>New $safe_form_type Submission</p>
                    </td>
                </tr>
                <!-- Body -->
                <tr>
                    <td style='padding:28px 30px;'>
                        <p style='margin:0 0 20px;color:#333;font-size:15px;line-height:1.5;'>
                            You have received a new inquiry from your website. Details below:
                        </p>
                        <table width='100%' cellpadding='0' cellspacing='0' style='border:1px solid #eee;border-radius:6px;overflow:hidden;'>
                            $rows
                        </table>
                    </td>
                </tr>
                <!-- Footer -->
                <tr>
                    <td style='padding:18px 30px;background:#f9f9fb;text-align:center;border-top:1px solid #eee;'>
                        <p style='margin:0;color:#999;font-size:12px;'>This email was sent automatically from vectraforeignservices.com</p>
                    </td>
                </tr>
            </table>
        </td></tr>
    </table>
</body>
</html>";

// ── 9. Proper headers for inbox delivery ──
$sanitized_email = filter_var($email, FILTER_SANITIZE_EMAIL);
$message_id = '<' . uniqid('vectra_', true) . '@vectraforeignservices.com>';

$headers  = "From: \"Vectra Foreign Services\" <info@vectraforeignservices.com>\r\n";
$headers .= "Reply-To: $sanitized_email\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";
$headers .= "Message-ID: $message_id\r\n";
$headers .= "X-Priority: 1\r\n";
$headers .= "X-Mailer: VectraForeignServices/1.0";

// ── 10. Send ──
if (mail($to, $subject, $message, $headers)) {
    echo json_encode(["success" => true, "message" => "Email sent successfully"]);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Failed to send email. Please try again."]);
}
?>
