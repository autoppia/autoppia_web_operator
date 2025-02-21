export const DB = {
  messages: [
    {
      role: "user",
      content: "Hey, can you check the server status?",
    },
    {
      role: "assistant",
      content:
        "Sure! I just checked the server, and everything is running smoothly. No downtime or performance issues detected. Let me know if you need a more detailed report on server logs or resource usage.",
      action: "check_server_status",
      status: "success",
    },
    {
      role: "user",
      content: "Can you schedule a meeting for tomorrow at 3 PM?",
    },
    {
      role: "assistant",
      content:
        "I've successfully scheduled your meeting for tomorrow at 3 PM. You'll receive a calendar invite shortly. Would you like me to notify the participants or set up a reminder before the meeting starts?",
      action: "schedule_meeting",
      period: 1440,
      status: "success",
    },
    {
      role: "user",
      content: "Remind me to submit the report by 5 PM.",
    },
    {
      role: "assistant",
      content:
        "I've set a reminder for you to submit the report by 5 PM. I'll send you a notification 15 minutes before the deadline to ensure you have enough time to finalize everything. Let me know if you want me to add any specific details to the reminder.",
      action: "set_reminder",
      period: 300,
      status: "pending",
    },
    {
      role: "user",
      content: "Please fetch the latest sales report.",
    },
    {
      role: "assistant",
      content:
        "I’ve retrieved the latest sales report for this month. The total revenue has increased by 12%, and customer engagement metrics have also improved. Let me know if you need a breakdown of the sales figures by region or product category.",
      action: "fetch_report",
      status: "success",
    },
    {
      role: "user",
      content: "Cancel my previous meeting request.",
    },
    {
      role: "assistant",
      content:
        "I've successfully canceled your previously scheduled meeting. You should receive a cancellation notice in your calendar shortly. If this was a mistake or you’d like to reschedule, just let me know the new date and time.",
      action: "cancel_meeting",
      status: "success",
    },
    {
      role: "user",
      content: "Send a follow-up email to the client about the proposal.",
    },
    {
      role: "assistant",
      content:
        "I've drafted a follow-up email to the client regarding the proposal. It includes a summary of the key points, a request for feedback, and a reminder of the deadline. Let me know if you’d like me to add anything before I send it.",
      action: "send_email",
      status: "pending_approval",
    },
    {
      role: "user",
      content: "Update the project status to 'In Progress'.",
    },
    {
      role: "assistant",
      content:
        "I've updated the project status to 'In Progress' in the system. Your team members have been notified about the change. Let me know if you'd like me to add any notes or update the expected completion date.",
      action: "update_project_status",
      status: "success",
    },
  ],
};
