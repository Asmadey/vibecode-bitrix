#!/usr/bin/env python3
"""Static server for the showcase with caching turned off.

A plain reload always shows the files on disk, so there is no need to add
version numbers to the asset links in index.html.

Usage: python3 serve.py [port]   (default port 8000)
"""
import http.server
import sys
from functools import partial
from pathlib import Path


class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, must-revalidate")
        super().end_headers()


def main():
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
    root = Path(__file__).resolve().parent
    handler = partial(NoCacheHandler, directory=str(root))
    # Bound to localhost only: the page is for this machine.
    with http.server.ThreadingHTTPServer(("127.0.0.1", port), handler) as httpd:
        print(f"Serving {root} at http://localhost:{port}/index.html (Ctrl+C to stop)")
        httpd.serve_forever()


if __name__ == "__main__":
    main()
