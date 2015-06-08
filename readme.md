# Slack Clone

Slick - integrated office distractions



[MVP Schema](/docs/schema.md)

[Views](/docs/views.md)

[Wireframes](/docs/wireframes/)



## Questions:
- Separate models for group/private chat? (private chat at all to start?)


## Minimum Viable Product
Slick the distraction tool for corporate organizations.

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
Do auth. Implement the skeleton of a messaging app.  Messages will be done using plain rails views for testing purposes only.  The focus should be on building out as little as possible. (build everything presuming `Messages.all` will be the feed source)

### Phase 2: Inline edits with previews (2 days)
Get API rolling for backbone app, should be able to create and edit chat messages in a message index.(all posts from all users)  Setup naive ajax polling working to keep page updated.

### Phase 3: Groups and channels (2 days)
Build backbone interface for feeds of groups and channels.  Be able to switch between them.  Get the general HTML/CSS layout correct in this step. (Avoid framework dependent css, might not be able to get proper look easily with bootstrap.)

### Phase 4: Finish memberships, make it look good (1 days)
Finish anything remaining with groups and make the pages look kickass.  Barebones MVP should be done at this point.  If it looks okay at this point start adding bonus features.

### Phase 5: Add features (2 days)
Add markdown to enable feed styling. (might have to limit types of styling) This is where we add the ooo-ahhh features.  Do pagination for the channel feeds.  Start testing websockets with pusher.
Weed out any remaining bugs/glitches.


### Phase 6: Add wish list items
- Use websockets instead of naive ajax polling
- Favorite items (users, channels, posts)
- Pin Items
- Search posts based on username and post content
- Create/view mentions
- Show current users in channel
