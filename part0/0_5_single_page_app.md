````
title 0.5 Single Page App

Browser->Server: HTTP GET /spa
Server->Browser: HTTP 200 HTML code
Browser->Server: HTTP GET /main.css
Server->Browser: HTTP 200 CSS stylesheet
Browser->Server: HTTP GET /spa.js
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
````

![Diagram](https://www.websequencediagrams.com/cgi-bin/cdraw?lz=dGl0bGUgMC41IFNpbmdsZSBQYWdlIEFwcAoKQnJvd3Nlci0-U2VydmVyOiBIVFRQIEdFVCAvc3BhCgAQBi0-ACAHABgHMjAwIEhUTUwgY29kZQAnHG1haW4uY3NzAC0bQ1NTIHN0eWxlc2hlZXQAcR8uagAvHEpTAIELBgpub3RlIG92ZXIgAIEwCACBYAggZXhlY3V0ZXMAJAlhbmQgbWFrZXMgQUpBWCByZXF1ZXN0IHRvIGdldCBKU09OIGRhdGEKZW5kIG5vdGUAghYdZGF0YS5qc29uAIEJHQBLCACBAyVvbnJlYWR5c3RhdGVjaGFuZ2UgaGFuZGxlcgp3aGljaCB1cGRhdGVzIHRoZQCBHAVzIGluIHdlYiBwYWdlAIEtCg&s=napkin)