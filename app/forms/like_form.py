from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField
from wtforms.validators import DataRequired, Length


class StoryForm(FlaskForm):
    count = IntegerField("Count", validators=[DataRequired(
        message="Like count must be included.")])
