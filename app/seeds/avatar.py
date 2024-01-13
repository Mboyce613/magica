from app.models import db, Avatar, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_avatars():
    demo_avatar = Avatar(
        user_id = 1, background_id = 1, hair_id = 1, face_id = 1, body_id = 1)
    marnie_avatar = Avatar(
        user_id = 2, background_id = 2, hair_id = 2, face_id = 2, body_id = 2)
    bobbie_avatar = Avatar(
        user_id = 3, background_id = 3, hair_id = 3, face_id = 3, body_id = 3)

    db.session.add(demo_avatar)
    db.session.add(marnie_avatar)
    db.session.add(bobbie_avatar)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_avatars():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.avatars RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM avatars"))

    db.session.commit()

#update