import os
import json
import threading
import sys
from http.server import BaseHTTPRequestHandler, HTTPServer

from one_sdk import OneClient, PerformError, UnexpectedError


class MyServer(BaseHTTPRequestHandler):
  def do_GET(self):
    self.send_response(200)
    self.send_header("Content-type", "application/json")
    self.end_headers()

    self.wfile.write(bytes(json.dumps(
        {
            "url": self.path,
            "method": self.command,
            "headers": dict(self.headers)
        }
    ), "utf8"))


webServer = HTTPServer(("127.0.0.1", 8000), MyServer)
threading.Thread(target=webServer.serve_forever).start()

client = OneClient(
    assets_path="../superface",
    token=os.getenv("SUPERFACE_ONESDK_TOKEN")
)

profile = client.get_profile("test")
use_case = profile.get_usecase("Test")
try:
    r = use_case.perform(
        {"text": "test"},
        provider="localhost",
        parameters={"PARAM": "parameter_value"},
        security={"basic_auth": {
            "username": "username", "password": "password"}}
    )
    print(f"RESULT: {r}")
    sys.exit(0)
except Exception as e:
    print(f"ERROR:", e, file=sys.stderr)
    sys.exit(1)
finally:
    client.send_metrics_to_superface()
    webServer.shutdown()
