from models import db, User, Posts, Tags, PostTags

def add_to_PostTags_table(post, args):
    if type(post) == list:
        for x in args:
            if args[x] == 'True':
                tag = Tags.query.filter_by(name=x)
                PostTag = PostTags(post_id=post[0].id, 
                                tag_id=tag[0].id)
                db.session.add(PostTag)
    else:
        for x in args:
            if args[x] == 'True':
                tag = Tags.query.filter_by(name=x)
                PostTag = PostTags(post_id=post.id, 
                                tag_id=tag[0].id)
                db.session.add(PostTag)
    db.session.commit()
