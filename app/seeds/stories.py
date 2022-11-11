from app.models import db, Story, environment, SCHEMA


def seed_stories():
    instance1 = Story(
        user_id=1,
        title="title1",
        image="storyimage1",
        content="storycontent1"
    )
    instance2 = Story(
        user_id=1,
        title="title2",
        image="storyimage2",
        content="storycontent2"
    )
    instance3 = Story(
        user_id=1,
        title="title3",
        image="storyimage3",
        content="storycontent3"
    )
    instance4 = Story(
        user_id=2,
        title="title4",
        image="storyimage4",
        content="storycontent4"
    )
    instance5 = Story(
        user_id=3,
        title="title5",
        image="storyimage5",
        content="storycontent5"
    )

    db.session.add(instance1)
    db.session.add(instance2)
    db.session.add(instance3)
    db.session.add(instance4)
    db.session.add(instance5)
    db.session.commit()


def undo_stories():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.stories RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM stories")

    db.session.commit()
