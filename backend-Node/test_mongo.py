from pymongo import MongoClient

uri = "mongodb+srv://amitlpatil282006:0i1fy6v0ClOnAxsh@cluster0.opmseml.mongodb.net/?appName=Cluster0"
try:
    client = MongoClient(uri, serverSelectionTimeoutMS=5000)
    client.admin.command('ping')
    print("Python connected successfully!")
except Exception as e:
    print(f"Connection failed: {e}")
