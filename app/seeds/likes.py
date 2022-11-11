from app.models import db, Like, environment, SCHEMA


def seed_likes():
    instance1 = Like(
        user_id=1,
        story_id=1,
        count=1
    )
    instance2 = Like(
        user_id=1,
        story_id=2,
        count=2
    )
    instance3 = Like(
        user_id=1,
        story_id=3,
        count=3
    )
    instance4 = Like(
        user_id=2,
        story_id=1,
        count=4
    )
    instance5 = Like(
        user_id=4,
        story_id=1,
        count=5
    )

    db.session.add(instance1)
    db.session.add(instance2)
    db.session.add(instance3)
    db.session.add(instance4)
    db.session.add(instance5)
    db.session.commit()


def undo_likes():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.likes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM likes")

    db.session.commit()
