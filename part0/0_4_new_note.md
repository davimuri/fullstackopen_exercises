```
title 0.4 New Note

Browser->Server: HTTP POST /new_note
Server->Browser: HTTP 203 redirect /notes
Browser->Server: HTTP GET /notes
Server->Browser: HTTP 200 HTML code
Browser->Server: HTTP GET /main.css
Server->Browser: HTTP 200 CSS stylesheet
Browser->Server: HTTP GET /main.js
Server->Browser: HTTP 200 JS code

note over Browser:
Browser executes JS code
and makes AJAX request to get JSON data
end note

Browser->Server: HTTP GET /data.json
Server->Browser: HTTP 200 JSON data

note over Browser:
Browser executes onreadystatechange handler
which updates the notes in web page
end note
```

![Diagram](https://www.websequencediagrams.com/cgi-bin/cdraw?lz=dGl0bGUgMC40IE5ldyBOb3RlCgpCcm93c2VyLT5TZXJ2ZXI6IEhUVFAgUE9TVCAvbmV3X25vdGUKABYGLT4AJgcAHgcyMDMgcmVkaXJlY3QgL25vdGVzADgXR0VUABkIADMYMCBIVE1MIGNvZGUAKRxtYWluLmNzACwcQ1NTIHN0eWxlc2hlZXQALCFqAHgcSlMAgQwGCm5vdGUgb3ZlciAAgXwIAIIyCCBleGVjdXRlcwAkCWFuZCBtYWtlcyBBSkFYIHJlcXVlc3QgdG8gZ2V0IEpTT04gZGF0YQplbmQgAIJaBQCCGhxkYXRhLmpzb24AgQkdAEsIAIEDJW9ucmVhZHlzdGF0ZWNoYW5nZSBoYW5kbGVyCndoaWNoIHVwZGF0ZXMgdGhlAIEcBXMgaW4gd2ViIHBhZ2UAgS0K&s=napkin)