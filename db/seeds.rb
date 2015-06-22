# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
robot = User.create(username: 'slickbot', password: "foobar", profile_img_url: "http://res.cloudinary.com/slickapp-io/image/upload/v1434946795/iiqlkagkdktezp7ehsnn.png" )
user = User.create(username: "powersjcb", password: "foobar", profile_img_url: 'http://res.cloudinary.com/slickapp-io/image/upload/c_fit,w_40/v1434774499/lbecr2g8vlczlgmvvf4i.jpg')
user.created_groups.create(name: "SlickAppHQ", description: "Building a better app")
chat = user.created_chats.create(title: "ActiveChat", group_id: 1)
group = Group.find(1)
robot.join(group)
botChat = robot.created_chats.create(title: "RobotChat", group_id: 1, bot: true)


robot.sent_messages.create(
  content: "Hi there, I'm a bot with a very limited vocabulary. Use me to test out the app.  Check out ActiveChat channel to see a longer sample conversation",
  conversation_id: botChat.id
)

usernames = ["zackrd", "nitin", "andrew", 'sarah1', "robert", "jenny", 'frank', 'alice', "ming", "dan", "george" ]
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
  user = User.create(
    username: username,
    password: "12345asdfg",
    profile_img_url: profile_urls[i]
  )
  user.memberships.create(group_id: 1)
  user.subscriptions.create(conversation_id: 3)
end
users = User.all.drop(1)

distraction = [
  "hey look at this cute picture!",
  "look what i found on the internets",
  "sorry, but i had to share this",
  "look at this!",
  "this is great!",
  "wow, such..."
]

distraction_urls = [
  "http://res.cloudinary.com/slickapp-io/image/upload/c_fit,w_600/v1434879982/zctn8jgmhun7ue6qegds.jpg",
  "http://res.cloudinary.com/slickapp-io/image/upload/c_limit,w_600/v1434879971/pdavfbkzxpnvinkux50f.jpg",
  "http://res.cloudinary.com/slickapp-io/image/upload/c_limit,w_600/v1434879958/qywuohyaenxda7b8lbf0.jpg",
  "http://res.cloudinary.com/slickapp-io/image/upload/c_fit,w_600/v1434879946/bqhmkeb8qlwbg8cms9h8.jpg",
  "http://res.cloudinary.com/slickapp-io/image/upload/c_limit,w_600/v1434881771/kbvibez1vxuhr3vkydfu.png",
  "http://res.cloudinary.com/slickapp-io/image/upload/c_limit,w_600/v1434881760/fwu0rdjmzubvkgmhvuwl.jpg",

]

work_chat = [
  "we need to finish this soon",
  "here's the plan for this week so far",
  "check out this nice utility",
  "this is going to be a long week",
  "man, this project is so cool. I can't wait to get started!"
]

work_urls = [
  "http://res.cloudinary.com/slickapp-io/image/upload/c_limit,w_600/v1434879911/f663psxj5eow07vcq64z.png",
  "http://res.cloudinary.com/slickapp-io/image/upload/c_limit,w_600/v1434879901/cot31jguaj2zsa7fkfof.png",
  "http://res.cloudinary.com/slickapp-io/image/upload/c_limit,w_600/v1434879927/fmc5ywcnhbqypaiuqdwe.png",
  "http://res.cloudinary.com/slickapp-io/image/upload/c_limit,w_600/v1434879919/hqvzuxe8sujfcja650e2.png"
]



10.times do
  smart = Random.rand(100) > 5
  smart_img = Random.rand(100) < 15
  if smart && smart_img
    content = work_chat.sample
    img_url = work_urls.sample
  elsif smart
    img_url = ""
    content = Faker::Hacker.say_something_smart
  else
    content = distraction.sample
    img_url = distraction_urls.sample
  end

  users.sample.sent_messages.create!(content: content, conversation_id: 3, url: img_url)
end
