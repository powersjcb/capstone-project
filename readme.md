# Slack Clone

Slick - integrated office distractions

https://example.com with custom domain

## Questions:
- Separate models for group/private chat? (private chat at all to start?)


## Minimum Viable Product
Distraction/messaging tool for organizations.

- Users log in
- Users can have near real time chat
- Group and private conversations
- Can edit content in place
- Messages can be formatted with markdown for styling
- Messages with image urls are parsed to auto-embed in page
- Can join channels
- Create/join groups

## Timeline

### Phase 1: User auth, make group/private chat feeds (1 day)
Implement using dumb rails views, nothing realtime.  Will build data model to support channels, all feeds will be a channel.  Private chat will be channels limited to 2 users. Will be hosted on Heroku.


### Phase 2: Inline edits with previews and markdown integration (2 days)
Get API rolling for backbone app, should be able to create and edit chat messages in channel.  Setup naive ajax polling working to keep page updated. Will have markdown rendering for chat feed items.

### Phase 3: Groups and channels (2 days)
Build backbone interface for switching groups and channels.  Get the general HTML/CSS layout correct in this step.

### Phase 4: Auto-embed images and filepicker images (2 days)
Search posts based on username and post content. Parse http links that are of image files, display on page.  Add filepicker integration for new images to be uploaded.

### Phase 5: Make it look perfect (? days)
  All the CSS and JS.

### Phase 6: Add wish list items
- Use websockets instead of naive ajax polling
https://devcenter.heroku.com/articles/websockets
- Search posts based on username and post content
- Pin Items
- View mentions
- Favorite items (users, channels, posts)
- Show current users in channel