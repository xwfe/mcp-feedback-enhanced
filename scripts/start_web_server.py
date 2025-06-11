import time
from mcp_feedback_enhanced.web import get_web_ui_manager

if __name__ == "__main__":
    manager = get_web_ui_manager()
    manager.start_server()
    print(manager.get_server_url(), flush=True)
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        manager.stop()
