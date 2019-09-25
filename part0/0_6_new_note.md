````
title 0.6 New Note

User->Browser: Fills note and submits form

note over Browser:
Browser executes onsubmit handler
which add new note to list of notes,
update webpage with list of notes
and makes AJAX call to Server
end note

Browser->Server: HTTP POST /new_note_spa
Server->Browser: HTTP 201 "note created"

note over Browser:
Browser executes onreadystatechange handler
which only prints response in console
end note
````

![Diagram](https://www.websequencediagrams.com/cgi-bin/cdraw?lz=dGl0bGUgMC42IE5ldyBOb3RlCgpVc2VyLT5Ccm93c2VyOiBGaWxscyBub3RlIGFuZCBzdWJtaXRzIGZvcm0KCgASBW92ZXIgACgICgAyByBleGVjdXRlcyBvbgAuBiBoYW5kbGVyCndoaWNoIGFkZCBuZXcAVAZ0byBsaXN0IG9mAGUFcywKdXBkYXRlIHdlYnBhZ2Ugd2l0aAAVDgphbmQgbWFrZXMgQUpBWCBjYWxsIHRvIFNlcnZlcgplbmQAgTAFCgCBCQgtPgAUBjogSFRUUCBQT1NUIC9uZXdfbm90ZV9zcGEKADQGAIFwCwAkBTIwMSAiAIF6BWNyZWF0ZWQiAIFPKHJlYWR5c3RhdGVjaGFuZ2UAgXIPb25seSBwcmludHMgcmVzcG9uc2UgaW4gY29uc29sZQCBOAo&s=napkin)