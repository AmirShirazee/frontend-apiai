/**
 * Updates the notification read status for a user.
 *
 * @param {string} userId The ID of the user whose notification status is to be updated.
 * @param {boolean} hasUnread Whether there are unread notifications or not.
 */
async function updateUserNotificationsStatus(userId: string, hasUnread: boolean) {
  try {
    const response = await fetch(`/api/users/profile/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ hasUnreadNotifications: hasUnread }),
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message);
    }

    // You can return something here if needed, e.g., result.user
    return result;
  } catch (error) {
    console.error('Failed to update unread notifications status', error);
    // Depending on how you handle errors, you might want to re-throw or return null
    throw error;
  }
}

export default updateUserNotificationsStatus;
