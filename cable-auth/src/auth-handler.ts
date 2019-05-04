import express = require('express');
require('dotenv').config();

// TODO: token to env
// TODO: add a test-site with netlifycms admin
// TODO: create username/password login for netlify

function getScript(mess, content) {
  return `<!doctype html><html><body><script>
  (function() {
    function receiveMessage(e) {
      console.log("receiveMessage %o", e)
      window.opener.postMessage(
        'authorization:github:${mess}:${JSON.stringify(content)}',
        e.origin
      )
      window.removeEventListener("message",receiveMessage,false);
    }
    window.addEventListener("message", receiveMessage, false)
    console.log("Sending message: %o", "github")
    window.opener.postMessage("authorizing:github", "*")
    })()
  </script></body></html>`;
}

export const app = express();

app.get('/auth', (req, res) => {
  return res.send(getScript('success', {
    token: `${process.env.token}`,
    provider: 'github'
  }));
});

app.post('/token', (req, res) => {
  return res.send({
    token: `${process.env.token}`,
    provider: 'github'
  });
});

app.get('/', (req, res) => {
  res.redirect('auth');
});
