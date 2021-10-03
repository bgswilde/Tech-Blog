// function to add the data from the front end form to the comment model on the backend (async to handle the fetch request)
async function commentFormHandler(event) {
    event.preventDefault();
  
    const comment_text = document.querySelector('#comment-text').value.trim();
    // gets the blogpost id from end of the current url 
    const blogpost_id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
  
    if (comment_text) {
        const response = await fetch('/api/comments', {
          method: 'POST',
          body: JSON.stringify({
            blogpost_id,
            comment_text
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
      
        if (response.ok) {
          document.location.reload();
        } else {
          alert(response.statusText);
        }
    }
}
  
document.querySelector('#add-comment').addEventListener('submit', commentFormHandler);