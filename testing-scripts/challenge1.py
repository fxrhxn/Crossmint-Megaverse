import requests

BASE_URL = "https://challenge.crossmint.io/api/"

def create_polyanet(row, column):
    endpoint = f"{BASE_URL}polyanets"
    data = {"row": row, "column": column}
    response = requests.post(endpoint, data=data)
    return response.json()

def main():
    # Define the positions for the X-shaped pattern
    positions = [
        (2, 2), (2, 8),
        (3, 3), (3, 7),
        (4, 4), (4, 6),
        (5, 5),
        (6, 4), (6, 6),
        (7, 3), (7, 7),
        (8, 2), (8, 8)
    ]

    # Create Polyanets at specified positions
    for position in positions:
        create_polyanet(*position)

if __name__ == "__main__":
    main()
