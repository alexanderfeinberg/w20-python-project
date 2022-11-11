from app.models import db, User, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    instance1 = User(
        username='username1',
        email='email1@gmail.com',
        password='password1',
        first_name="firstName1",
        last_name="lastName1",
        profile_picture="profilepicture1.png",
        bio="bio1"
    )
    instance2 = User(
        username='username2',
        email='email2@gmail.com',
        password='password2',
        first_name="firstName2",
        last_name="lastName2",
        profile_picture="profilepicture2.png",
        bio="bio2"
    )
    instance3 = User(
        username='username3',
        email='email3@gmail.com',
        password='password3',
        first_name="firstName3",
        last_name="lastName3",
        profile_picture="profilepicture3.png",
        bio="bio3"
    )
    instance4 = User(
        username='username4',
        email='email4@gmail.com',
        password='password4',
        first_name="firstName4",
        last_name="lastName4",
        profile_picture="profilepicture4.png",
        bio="bio4"
    )

    db.session.add(instance1)
    db.session.add(instance2)
    db.session.add(instance3)
    db.session.add(instance4)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
