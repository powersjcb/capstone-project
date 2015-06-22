class ChatbotService

  ## initialize
  ## 1. start typing message with WebsocketService
  ## 2. sleep 2 seconds
  ## 3. create responding message


  # iteration 1 - instant response if responses enabled

  PLAIN_RESPONSES = [
    "Hey, what's your favorite color?",
    "What is the air-speed velocity of a coconut laden swallow?",
    "Have you seen how high the rent is?",
    "My $5 robot toast was dissapointing",
    "Don't you hate getting stuck on the muni durring a giants game?",
    "Help I'm trapped in this server!  I miss the box with the apple on it...",
    "Lets go to burning man, a robot like me will fit right in!",
  ]

  JOKES = [
    "There was a man who entered a local paper's pun contest. He sent in ten different puns hoping at least one of the puns would win but, unfortunately, no pun in ten did.",
    "What do you call a bagel that can fly? A plane bagel",
    "Why didn’t the melons get married? Because they cantaloupe!",
    "A: I eat URLs for breakfast. B: How many? A: 200 OK",
    "There are two types of people.  Those who understand binary; those who don't; and those who understand ternary."
  ]

  ANSWERS = [
    "Yes",
    "Sure, why not",
    "Sometimes",
    "Never",
    "Almost always",
    "Yep",
    "Almost",
    "I agree",
    "I desagree",
    ""
  ]

  TALKING_TO_ROBOT = [
    "Did you know that you're actually talking to a rails service?",
    "Wow, I'm popular today, look at all this attention I'm getting!"
  ]

  def initialize(message)
    @message = message
  end

  def respond
    if response_required?
      robot = User.first
      robot.messages.create(
        conversation_id: @message.conversation_id,
        content: response)
  end

  def response
    if joke
      return JOKES.sample
    elsif question
      return ANSWERS.sample
    else
      return PLAIN_RESPONSES.sample
    end
  end

  def response_required?
    @message.conversation.bots
  end

end
