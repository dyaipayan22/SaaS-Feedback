
# SASS Feedback App Solution



## Run Locally

Clone the project

```bash
  git clone https://github.com/dyaipayan22/SaaS-Feedback.git
```

Go to the project directory

Start the server

```bash
  cd server
  npm run dev
```
Start the client

```bash
  cd client
  npm install
  npm run dev
```


## Table of contents

#### Overview
![Screenshot 2023-12-30 233053](https://github.com/dyaipayan22/SaaS-Feedback/assets/115914025/5df16e4f-9692-4179-b96d-7ad9919a7cca)

#### The Challenge
Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Create, read, update, and delete SASS feedback requests
- Receive form validations when trying to create/edit feedback requests
- Sort suggestions by most/least upvotes and most/least comments
- Filter suggestions by category
- Add comments and replies to a SASS feedback request
- Upvote SASS feedback requests
- Keep track of any changes, even after refreshing the browser (`localStorage` could be used for this if you're not building out a full-stack app)

#### Steps

- Added hover states for interactive elements on page with hover selector.
- Implemented CRUD operations for feedbacks.
- Validated form when trying to create/edit feedback requests with react-hook-form.
- Sorted suggestions by most/least upvotes and most/least comments.
- Filtered suggestions by category.
- Added feature to upvote SASS feedback requests.
