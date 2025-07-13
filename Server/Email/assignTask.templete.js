export const assignTaskTemplate = (userName, taskTitle, deadline, description, taskLink) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 24px; background-color: #ffffff; color: #000000; border: 1px solid #dcdcdc; border-radius: 8px;">
    
    <h2 style="font-size: 20px; border-bottom: 1px solid #e5e5e5; padding-bottom: 10px; margin-bottom: 20px;">
      📌 New Task Notification
    </h2>

    <p>Hello <strong>${userName}</strong>,</p>

    <p>You’ve been assigned a new task on <strong>Nuegas</strong>. Please find the details below:</p>

    <div style="padding: 12px; border: 1px solid #ccc; border-radius: 6px; margin: 20px 0;">
      <p><strong>Task:</strong> ${taskTitle}</p>
      <p><strong>Deadline:</strong> ${deadline}</p>
      <p><strong>Description:</strong><br>${description}</p>
    </div>

    <a href="${taskLink}" style="display: inline-block; margin-top: 20px; background-color: #000000; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
      View Task
    </a>

    <p style="margin-top: 30px;">Stay productive,<br><strong>The Nuegas Team</strong></p>

    <hr style="margin: 30px 0; border: none; border-top: 1px solid #dcdcdc;" />
    <p style="font-size: 12px; color: #888888;">This is an automated message. Do not reply to this email.</p>
  </div>
`;
