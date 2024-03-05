docs in https://sangyoonyu.gitbook.io/abc
# Overview
We've developed ABC (AI + Binance + Community Podcaster), a new platform for those interested in understanding diverse perspectives. In the past, we shared our thoughts through blog posts and tweets. Now, we're leveraging AI to introduce a novel way of idea sharing. Our aim is to use AI to gather various opinions and create an AI podcaster that can engage in deep discussions with users!

![image](https://github.com/AIM-Intelligence/Ai-Binance-Cast/assets/57357447/7b100b4d-be11-4068-9f24-7c7dc9d17b0d)


# AI Podcaster
## Topic Submission
People voluntarily consume tokens to submit new topics. 
When people are curious about social, personal, or technical issues, they submit proposals to hear from the public. Also, people want to see only rational and logical opinions related to the proposal while excluding irrelevant opinions. 
When the proposal submitted receives a certain amount of tokens through voting, the submitter receives tokens as a reward. 

## Exercise of voting rights for proposals submitted by people 
### Reasons for voting on proposals 
Contributing to the selection of proposals by voting on submitted ones. People voluntarily consume tokens to vote on submitted proposals. Reasons for voting on proposals When curious about societal, personal, or technical issues. The more tokens spent on voting, the more rewards one can receive if the proposal is accepted and participation is high. Receiving a small amount of tokens when a proposal is accepted and additional tokens depending on the participation level later. Gaining tokens proportional to the tokens voted if the proposal receives a certain amount of tokens and is accepted. Voting on proposals to earn tokens, as a portion of the fees (in tokens) for using the AI podcaster created from the proposal is distributed according to the amount of tokens invested in voting. Preventing those with many tokens from repeatedly submitting and getting proposals accepted (to prevent inflation). There's no need to submit the same proposal if there's already one receiving some votes, as one would vote on the submitted proposal instead of spending tokens to submit the same.

## Knowledge Staking via Discussion
Collecting Opinions on Proposed Issues (Creating AI Spokespersons Trained on Collected Opinions) 
If the total tokens voted on a submitted proposal exceed a certain amount, the proposal is selected, and people can submit their opinions on the chosen proposal. People enter their opinions by interacting with pro/con chatbots regarding the proposed issue. The entered opinions are used to train an AI spokesperson that represents these opinions. Participants earn tokens proportional to the quality of the opinions they submit. Opinions from participants are scored, and lower scores receive fewer tokens. A mechanism exists to encourage competition between opinions on both sides. The number of participants in favor/against and the number of words each AI spokesperson has learned are displayed. 

Reasons for people to enter their opinions: 
- To input their opinions and reasoning on the issue, allowing them to advocate through the spokesperson.
- To persuade others with their opinions. 
- To receive tokens. 
Tokens are needed to converse with the created spokesperson. Creating AI Spokespersons Trained on Collected Opinions AI spokespersons (Chatbots) for and against the issue are created by synthesizing the opinions collected during a set period. The created chatbots are categorized and stored in the AI spokesperson session. No further training is done, and they are stored as NFTs. Additional tokens are awarded to the person who submitted and got the proposal accepted, based on participation and the data entered. Participants who provided opinions own a stake in the created AI spokesperson, proportional to the quality and quantity of their contributions.

### LLM Safety Filters
#### Security & Ethics
1. phi-2 prompt injection detector (https://huggingface.co/ysy970923/phi-2-prompt-injection-QLoRA)
2. Profanity Filters with Zero-Shot LLM Prompting
3. PII (personal identifiable information) checking via Microsoft Presidio Analyzer

#### Information value estimate
1. RAG based LLM prompting with existing responses in the vector DB.
2. check plagiarism
3. estimate information value

## Pay to Chat
You can engage in conversations with the created AI podcaster by consuming tokens. A portion of the consumed tokens is distributed to the individuals who submitted the issue, helped get it accepted, and submitted opinions. The remainder of the consumed tokens is burned (permanently removed from circulation).

# 🪙ABC Token ($ABC)
#### Token Utility
$ABC is run by a burn and mint mechanism, with a balance in both sides to maintain the token value.
The most prominent functionality of $ABC is to allow holders to talk with the AI Podcaster. Users can burn $ABC to suggest new topics or chat to existing AI podcasters, while $ABC stakers can vote on new AI podcaster topics, protocol updates, parameter changes, new features development, treasury distribution, and other ecosystem expansion initiatives.
Via the ABC Treasury, $ABC is designed to capture a portion of yields and transactions generated across all AI podcasters on ABC Platform, such that $ABC holders directly benefit from the growth of Protocol's total value locked (TVL).

# Chat Marketplace
## Trading Chats with AI
Chatting data with leading minds and influencers with AI podcasters possess high value.

Publishing and Trading AI Conversations on BNB Greenfield as NFTs Individuals can publish their conversations with AI spokespersons on BNB Greenfield as NFTs, allowing others to buy and sell these interactions. 
Tokens can be traded during this process. Using BNB wallets and Greenfield technology, it is possible to authenticate that the parties actually had the conversations with the AI podcaster. 

This provides YouTubers, influencers, and celebrities with additional revenue opportunities and the value of promotional effects through this service.

## BNB Greenfield
We use BNB Greenfield technology as a paywall to safely build a marketplace where only paid users can view the chat data.
