# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#

user = User.create(username: "powersjcb", password: "foobar", profile_img_url: 'http://res.cloudinary.com/slickapp-io/image/upload/c_fit,w_40/v1434774499/lbecr2g8vlczlgmvvf4i.jpg')
group = user.created_groups.create(name: "SlickAppHQ", description: "Building a better app")
user.created_chats.create(title: "ActiveChat", group_id: 1)

usernames = ["zackrd", "nitin", "andrew", 'sarah1', "robert", "jenny", "alice", "ming", "dan", "george" ]
profile_urls = [
  "http://res.cloudinary.com/slickapp-io/image/upload/c_fit,w_40/v1434835898/jlvg8h2i1hqjr1e5zh1e.jpg",
  "http://res.cloudinary.com/slickapp-io/image/upload/c_fit,w_40/v1434835837/tvc1z5txizejyw8cwzcj.jpg",
  "http://res.cloudinary.com/slickapp-io/image/upload/c_fit,w_40/v1434835968/ymeicozaf3x7zsbqwzer.jpg",
  "http://res.cloudinary.com/slickapp-io/image/upload/c_fit,w_40/v1434872246/mtsnccbr5exzl9ec7tjy.jpg",
  "http://res.cloudinary.com/slickapp-io/image/upload/c_scale,w_40/v1434876481/qnohbsvqeqmg3llougri.jpg",
  "http://res.cloudinary.com/slickapp-io/image/upload/c_fit,w_40/v1434872076/dfws3rzunfgy9u9rssnk.jpg",
  "http://res.cloudinary.com/slickapp-io/image/upload/c_fit,w_40/v1434878880/iudsbnxivgunmz8tpewd.jpg",
  "http://res.cloudinary.com/slickapp-io/image/upload/c_fit,w_40/v1434860800/ulzddesimdfth7dnhfp4.jpg",
  "http://res.cloudinary.com/slickapp-io/image/upload/c_fit,w_40/v1434879633/efxgjlvhaywxrqu9iqmw.png",
  "http://res.cloudinary.com/slickapp-io/image/upload/c_fit,w_40/v1434879657/ogm1bsibq55ozawyjhun.jpg",
  "http://res.cloudinary.com/slickapp-io/image/upload/c_fit,w_40/v1434879648/avqqgkbjerpozronylj6.jpg"
  ]
usernames.each.with_index do |username, i|
  User.create(
    username: username,
    password: "12345asdfg",
    profile_img_url: profile_urls[i]
  )
end
users = User.all

distraction = [
  "hey look at this cute picture!",
  "look what i found on the internets",
  "sorry, but i had to share this",
  "look at this!",
  "this is great!",
  "wow, such..."
]

work_chat = [
  "we need to finish this part of the project soon",
  "this is going to be a long week",
  "man, this project is so cool. I can't wait to get started!"
]

work_url = [
  "http://res.cloudinary.com/slickapp-io/image/upload/c_limit,w_600/v1434879911/f663psxj5eow07vcq64z.png",
  "http://res.cloudinary.com/slickapp-io/image/upload/c_limit,w_600/v1434879901/cot31jguaj2zsa7fkfof.png",
  "http://res.cloudinary.com/slickapp-io/image/upload/c_limit,w_600/v1434879927/fmc5ywcnhbqypaiuqdwe.png",
  "http://res.cloudinary.com/slickapp-io/image/upload/c_limit,w_600/v1434879919/hqvzuxe8sujfcja650e2.png"
]



350.times do
  smart = Random.rand(5) > 1
  img = Random.rand(15) < 2
  if smart
    content = Faker::Hacker.say_something_smart
  elsif smart && img
    content = work_chat.sample
    url = work_url.sample
  else
    content = distraction.sample
    url = distrction_urls.sample
  end

  users.sample.sent_messages.create!(content: content, conversation_id: 1, url: img)
end
