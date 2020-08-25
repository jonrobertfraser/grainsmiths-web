import requests
import json

"""
This is a quick attempt to figure out how to change
settings for Auth0 via the API. It was not successful
but I think it's on the right track.
"""

host = "your auth host here..."

payload = {
    "client_id":"???",
    "client_secret":"???",
    "audience":"https://%s/[PATH]"%host,
    "grant_type":"client_credentials"}

headers = { 'content-type': "application/json" }

r = requests.post(host+"/oauth/token", json=payload, headers=headers)

response = json.loads(r.text)

print(json.dumps(response, indent=4))



headers = { 'authorization': "Bearer %s"%response['access_token'] }

json_data = { "login": { "description": "Login to Grainsmiths" } }
r = requests.get(host+"/api/v2/branding", json=json_data, headers=headers)
print(r.headers)
response = json.loads(r.text)

print(json.dumps(response, indent=4))