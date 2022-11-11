from app.models import db, environment, SCHEMA, User

# Adds a demo user, you can add other users here if you want
def seed_follows():
    instance1 = follows.append(
        follower_id=1,
        following_id=2
    )
    instance2 = follows.append(
        follower_id=2,
        following_id=1
    )
    instance3 = follows.append(
        follower_id=4,
        following_id=1
    )
    instance4 = follows.append(
        follower_id=4,
        following_id=2
    )
    instance5 = follows.append(
        follower_id=4,
        following_id=3
    )


    db.session.add(instance1)
    db.session.add(instance2)
    db.session.add(instance3)
    db.session.add(instance4)
    db.session.add(instance5)

    db.session.commit()



def undo_follows():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.followers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM followers")

    db.session.commit()
