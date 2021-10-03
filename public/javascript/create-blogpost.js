// function to add the data from the front end form to the blogpost model on the backend (async to handle the fetch request)
async function newBlogpostHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('#blogpost-title').value;
    const content = document.querySelector('#blogpost-content').value;
  
    const response = await fetch('/api/blogposts', {
      method: 'post',
      body: JSON.stringify({
        title: title,
        content: content
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      console.log(`${title} created`)
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
  
  document.getElementById('new-blogpost').addEventListener('submit', newBlogpostHandler);