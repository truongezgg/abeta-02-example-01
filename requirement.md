Authen:

- Auth JWT(token, refreshToken).
- Register
  - Email OTP
- Login
- Forgot password
  - Email OTP

Upload:

AWS S3

- Upload image

User:

- Profile(view, edit, upload avatar)
- Send friend request
  - Accept
  - Reject

Post:

- Create
- Edit
- Delete
- List posts
  - My posts
  - Friends' posts

Like

- Send notification when user like post
- View list user like post

Comment

- Comment text/image
- Send notification when user comment post
- List post's comment
- Like comment
- View list user like comment
- Delete comment(Post's owner, comment creator)

Notification:

One signal

- List notifications
- Read notification
- Read all notifications

Chat:

Socket.io, Chat text/image. Send notification if user is offline.

- Chat user vs user
- Chat group

Others:

- Send email to all users every day at 08:00PM "Server is under maintenance 08:00PM => 09:00PM"
