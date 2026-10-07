type EmailDetail = { label: string; value: string; monospace?: boolean };
type EmailStep = { title: string; text: string };
type EmailSection = {
  title: string;
  paragraphs?: string[];
  details?: EmailDetail[];
  steps?: EmailStep[];
};

type PurchaseEmail = {
  preview: string;
  eyebrow: string;
  title: string;
  design: string;
  introduction: string;
  action: { label: string; url: string };
  actionNote: string;
  sections: EmailSection[];
  supportEmail: string;
  footer: string;
};

const colors = {
  background: "#080a0d",
  surface: "#14171c",
  border: "#343536",
  gold: "#edcf87",
  text: "#f5f2eb",
  muted: "#bfc1c5",
};
const bodyStyle =
  "font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.7;word-wrap:break-word;overflow-wrap:anywhere;";

/** All content, including signed links and business briefs, enters as plain text. */
function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    switch (character) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      default:
        return "&#39;";
    }
  });
}

function multiline(value: string) {
  return escapeHtml(value).replace(/\r\n?|\n/g, "<br>");
}

function actionUrl(value: string) {
  // Email HTML has no arbitrary schemes or remote destinations. The payment layer
  // separately checks that localhost is used only for a development test purchase.
  const url = new URL(value);
  const website =
    (url.protocol === "https:" && url.hostname === "lltechsolutions.ca" && !url.port) ||
    (url.protocol === "http:" && ["localhost", "127.0.0.1"].includes(url.hostname));
  if (
    /[\r\n]/.test(value) ||
    url.username ||
    url.password ||
    (!website && url.protocol !== "mailto:")
  ) {
    throw new Error("Invalid purchase email action");
  }
  return escapeHtml(value);
}

function renderSection(section: EmailSection) {
  const paragraphs = (section.paragraphs ?? [])
    .map((value) => `<p style="margin:0 0 14px;color:${colors.muted};">${multiline(value)}</p>`)
    .join("");
  const details = (section.details ?? [])
    .map(
      ({ label, value, monospace }) => `<tr>
        <td style="padding:0 0 16px;${bodyStyle}">
          <p style="margin:0 0 3px;color:${colors.muted};font-size:12px;">${escapeHtml(label)}</p>
          <p style="margin:0;color:${colors.text};${monospace ? "font-family:Consolas,monospace;font-size:12px;word-break:break-all;" : ""}">${multiline(value)}</p>
        </td>
      </tr>`,
    )
    .join("");
  const steps = (section.steps ?? [])
    .map(
      ({ title, text }, index) => `<tr>
        <td width="34" valign="top" style="width:34px;padding:0 8px 20px 0;color:${colors.gold};font-size:12px;line-height:25px;">0${index + 1}</td>
        <td valign="top" style="padding:0 0 20px;${bodyStyle}">
          <p style="margin:0 0 3px;color:${colors.text};font-weight:bold;">${escapeHtml(title)}</p>
          <p style="margin:0;color:${colors.muted};">${multiline(text)}</p>
        </td>
      </tr>`,
    )
    .join("");
  return `<tr><td style="padding:26px 28px 12px;border-top:1px solid ${colors.border};${bodyStyle}">
    <h2 style="margin:0 0 18px;color:${colors.gold};font-size:12px;font-weight:bold;letter-spacing:1.3px;text-transform:uppercase;">${escapeHtml(section.title)}</h2>
    ${paragraphs}
    ${details ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;table-layout:fixed;">${details}</table>` : ""}
    ${steps ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;table-layout:fixed;">${steps}</table>` : ""}
  </td></tr>`;
}

/** Fluid tables and inline styles keep the receipt useful without CSS or images. */
export function renderPurchaseEmail(email: PurchaseEmail) {
  const href = actionUrl(email.action.url);
  const support = actionUrl(`mailto:${encodeURIComponent(email.supportEmail)}`);
  return `<!doctype html>
<html lang="en-CA">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="dark">
  <meta name="supported-color-schemes" content="dark">
  <title>${escapeHtml(email.title)} | L&amp;L Tech Solutions</title>
</head>
<body style="margin:0;padding:0;background-color:${colors.background};color:${colors.text};${bodyStyle}">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;mso-hide:all;">${escapeHtml(email.preview)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${colors.background}" style="width:100%;background-color:${colors.background};">
    <tr><td align="center" style="padding:28px 12px;">
      <!--[if mso]><table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0"><tr><td><![endif]-->
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${colors.surface}" style="width:100%;max-width:600px;table-layout:fixed;background-color:${colors.surface};border:1px solid ${colors.border};border-top:3px solid ${colors.gold};">
        <tr><td style="padding:26px 28px;border-bottom:1px solid ${colors.border};${bodyStyle}">
          <p style="margin:0;color:${colors.gold};font-size:16px;font-weight:bold;letter-spacing:0.4px;">L&amp;L <span style="color:${colors.text};font-weight:normal;">Tech Solutions</span></p>
        </td></tr>
        <tr><td style="padding:34px 28px 30px;${bodyStyle}">
          <p style="margin:0 0 16px;color:${colors.gold};font-size:11px;font-weight:bold;letter-spacing:1.6px;text-transform:uppercase;">${escapeHtml(email.eyebrow)}</p>
          <h1 style="margin:0 0 14px;color:${colors.text};font-family:Georgia,'Times New Roman',serif;font-size:36px;line-height:1.2;font-weight:normal;">${multiline(email.title)}</h1>
          <p style="margin:0 0 18px;color:${colors.gold};font-size:19px;line-height:1.5;">${escapeHtml(email.design)}</p>
          <p style="margin:0 0 26px;color:${colors.muted};">${multiline(email.introduction)}</p>
          <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
            <td align="center" bgcolor="${colors.gold}" style="background-color:${colors.gold};border-radius:3px;mso-padding-alt:15px 24px;">
              <a href="${href}" style="display:inline-block;padding:15px 24px;border:1px solid ${colors.gold};border-radius:3px;color:${colors.background};font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:bold;line-height:20px;text-decoration:none;">${escapeHtml(email.action.label)}</a>
            </td>
          </tr></table>
          <p style="margin:14px 0 0;color:${colors.muted};font-size:12px;line-height:1.7;">${multiline(email.actionNote)}</p>
        </td></tr>
        ${email.sections.map(renderSection).join("\n")}
        <tr><td style="padding:24px 28px;border-top:1px solid ${colors.border};${bodyStyle}">
          <p style="margin:0 0 8px;color:${colors.text};font-size:14px;">Questions? <a href="${support}" style="color:${colors.gold};text-decoration:underline;">Contact L&amp;L</a></p>
          <p style="margin:0;color:${colors.muted};font-size:12px;line-height:1.7;">${multiline(email.footer)}</p>
        </td></tr>
      </table>
      <!--[if mso]></td></tr></table><![endif]-->
    </td></tr>
  </table>
</body>
</html>`;
}
