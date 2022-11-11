from app.models import db, environment, SCHEMA

# Adds a demo user, you can add other users here if you want


def seed_followings(users):
    user1, user2, user3, user4 = users[0], users[1], users[2], users[3]

    user1.following.append(user2)
    user2.following.append(user1)
    user4.following.append(user1)
    user4.following.append(user2)
    user4.following.append(user3)

    db.session.commit()


def undo_followings():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.followers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM followers")

    db.session.commit()
