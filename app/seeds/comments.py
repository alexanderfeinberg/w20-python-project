from app.models import db, Comment, environment, SCHEMA


def seed_comments():
    instance1 = Comment(
        user_id=1,
        story_id=1,
        comment='This was an awesome blog post.'
    )
    instance2 = Comment(
        user_id=2,
        story_id=2,
        comment='Thanks for sharing.'
    )
    instance3 = Comment(
        user_id=3,
        story_id=3,
        comment='Great article!'
    )
    instance4 = Comment(
        user_id=4,
        story_id=4,
        comment='I totally agree with you'
    )
    instance5 = Comment(
        user_id=5,
        story_id=5,
        comment='Very cool. Thanks for sharing!'
    )
    db.session.add(instance1)
    db.session.add(instance2)
    db.session.add(instance3)
    db.session.add(instance4)
    db.session.add(instance5)
    db.session.commit()


def undo_comments():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM comments")

    db.session.commit()
