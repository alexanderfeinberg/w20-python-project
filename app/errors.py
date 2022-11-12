class NotFoundError(Exception):
    status_code = 400
    title = "Resource not found."

    def __init__(self, message):
        self.message = message
