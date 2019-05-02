import express = require('express');

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
    token: `2c410d5763fad5cb3ea5d732c272647da64bb8cd`,
    provider: 'github'
  }));
});

app.post('/token', (req, res) => {
  return res.send({
    token: `2c410d5763fad5cb3ea5d732c272647da64bb8cd`,
    provider: 'github'
  });
});

app.get('/', (req, res) => {
  res.redirect('auth');
});
