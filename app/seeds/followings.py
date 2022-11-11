from app.models import db, environment, SCHEMA

# Adds a demo user, you can add other users here if you want


def seed_follows(users):
    user1, user2, user3, user4 = users[0], users[1], users[2], users[3]

    user1.following.append(user2)
    user2.following.append(user1)
    user1.following.append(user4)
    user2.following.append(user4)
    user3.following.append(user4)

    db.session.commit()


def undo_follows():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.followers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM followers")

    db.session.commit()
