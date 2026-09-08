# Contact form setup and delivery check

The contact page and required-field validation were checked on the public site on September 8, 2026. A deliberately incomplete POST reached `/api/contact` and returned the expected 400 response with a request ID. These checks did not send an email and do not confirm inbox delivery.

## Production configuration

If the form already delivers successfully, retain the existing settings. Otherwise, open the L&L Vercel project (`lltechsolutions-otm7`), select Environment Variables, and check these server-only values for **Production**:

| Variable             | Value                                                                                                                                                 |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `RESEND_API_KEY`     | Your valid Resend sending API key. Keep this private.                                                                                                 |
| `CONTACT_TO_EMAIL`   | `LandLTechSolutions@protonmail.com`                                                                                                                   |
| `CONTACT_FROM_EMAIL` | A sender on a domain verified in your Resend account. For example, `L&L Tech Solutions <website@lltechsolutions.ca>` only if that domain is verified. |

Do not use your ProtonMail address as the sender: Resend requires a domain you own and verify. The recipient can be your ProtonMail inbox. If a verified sender is already configured, use it rather than changing working DNS settings.

For domain setup, add the exact sending-domain DNS records shown by Resend. Preserve existing mailbox records. See [Resend verified domains](https://resend.com/docs/dashboard/domains/introduction) and the [Next.js integration guide](https://resend.com/docs/send-with-nextjs).

After adding or changing Vercel environment variables, redeploy. Existing deployments retain their previous values. Select Preview too only if you want actual delivery enabled on preview deployments. See [Vercel environment variables](https://vercel.com/docs/environment-variables/managing-environment-variables).

## Local preview

Create `.env.local` in the actual review worktree, using the names in `.env.example`, then restart Next.js. The review/publish installers intentionally do not copy credentials from another checkout. Never commit `.env.local` or share the API key in a screenshot or chat.

## Confirm delivery

1. Open `/contact` on the intended domain and submit one clearly labelled test enquiry using your own email address.
2. Confirm that the form reports success, then check the receiving inbox and spam folder.
3. Check the corresponding email in Resend. A successful API request means the provider accepted it; the provider's delivery status and actual inbox receipt provide stronger evidence.
4. Confirm that Reply-To is the email entered in the form. Delete the test afterward if desired.

| Response                 | Meaning / next step                                                                                                                                |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| 400                      | Required fields, options or formatting are invalid.                                                                                                |
| 403                      | Origin verification failed. Use the form from the same website domain; retain the origin checks.                                                   |
| 429                      | Temporary throttling. Wait as directed before retrying.                                                                                            |
| 503                      | One or more required server email settings are missing. Set all three values and redeploy/restart.                                                 |
| 502                      | The email provider rejected the request or could not be reached. Check the API key, sender verification, permitted sending domain and Resend logs. |
| 200 with success message | The provider accepted the request. Confirm receipt rather than assuming it reached the inbox.                                                      |

The automatic smoke tests remove the API key and cannot deliver email. They intentionally verify that missing configuration returns 503 instead of pretending the enquiry was sent.
