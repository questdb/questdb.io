---
title: NYC cab drivers, the unsuspecting options traders
author: Tancrede Collard
author_title: QuestDB Team
author_url: https://github.com/TheTanc
author_image_url: https://avatars.githubusercontent.com/TheTanc
tags: [deep-dive, story]
description: An experiment analyzing the NYC taxi dataset through the eye of an options trader.
---

Every cab I have ever ridden complained about how hard it is for drivers to make ends meet. The public is generally quick to 
blame unfair competition from the likes of Uber. But other forces share the responsibility for this situation. 

In this post, I focus on the impact the antiquated meter system had on the livelihood of the beloved NYC cabbies by drawing an analogy with options trading.
Interestingly, this approach allows us to show that drivers are worse-off, independently of competition.

<!--truncate-->

A couple of weeks ago, I was preparing data for the demo we are hosting of QuestDB which you can try [here](http://try.questdb.io:9000/). 
It has been over a year since I left derivatives trading, so I was far from imagining the work on the NYC taxi dataset would lead me to write a post about options pricing. 
Much to my surprise, the economics of a taxi meter are very similar to the economics of options, and the forces that drive them affect cab drivers in similar ways.


## The economics of the taxi meter

The vast majority of rides are priced using the [standard meter system](https://www1.nyc.gov/site/tlc/passengers/taxi-fare.page). 
A meter calculates a fare based on time, speed, and distance. Then, depending on your route and when you are riding, it adds a number of taxes, tolls and surcharges.

Most of the driver's earnings come from the meter: a flat $2.50 for entering the cab, and a variable fare which is a function of speed, time and distance calculated as follows:
- $2.50 per mile when driving above 12mph
- $0.50 per minute otherwise (so the driver earns a living in case a customer takes them through traffic).

This post focuses on the variable fare (the output of the meter excluding the $2.50 start fee). 
We normalise it as an `hourly rate` assuming drivers are constantly driving a customer. 
Although this is a simplified version of reality, this produces results which can be compared over time and are independent of competition, offer and demand.

## Modeling variable earnings

Let's assume a cab is driving at a constant speed for an hour. At the end of the hour, the driver can expect to earn 
- $30 if they drove below 12mph ($0.50 a minute)
- $2.50 x their average speed if they drove above 12mph

Let's plot the hourly earnings in function of speed. This instantly reminds me of an old friend: call options!

<img
  alt="A chart of call option payoff showing how cab drivers earnings increase with their average realized driving speed"
  className="screenshot--shadow screenshot--docs"
  src="/img/blog/2020-10-16/cab-hourly-earnings-by-speed.png"
/>

Indeed, rewriting the fare formula as follows, we recognize the call option formula Max(0, S-K).

```Hourly Fare = 30 + max(0, Speed - 12)```

Interestingly, the above notation breaks down the hourly variable fare into two components.
- A guaranteed component `30`: whenever driving a customer, a cab will make a guaranteed $30 an hour. 
- An optional component `max(0, Speed - 12)`: The driver can make extra money by driving the customer around faster. 

Graphically, the breakdown between `guaranteed` and `variable` fare components look like the below:

<img
  alt="A chart of call option payoff showing how cab drivers earnings increase with their average realised driving speed broken down between fixed and variable"
  className="screenshot--shadow screenshot--docs"
  src="/img/blog/2020-10-16/cab-hourly-earnings-by-speed-breakdown.png"
/>

By design, the system is meant to ensure the interests of drivers and riders are aligned:
- The guaranteed part makes sure drivers get paid for their time. 
- The optional part incentivizes them to avoid taking customers through traffic.

Let's now try to quantify the value of this incentive part by using options pricing methods.

## A simple approach to options pricing

This post isn’t meant as an essay in financial mathematics (far from it). However, before we continue, it is useful to understand roughly why options are valuable. 
Buying an option is like paying to play a game with a monetary payout contingent on some `variable`.

As an example, imagine a game of dice. If the die value (our variable) is below 2, you receive 0. 
Otherwise, you receive the difference between that value and 2. 
In financial markets, the threshold of 2 is called the `strike price` and is traditionally denoted K. 

**You have to pay a fee to play this game, how much are you ready to pay?**

To find out, we have to calculate the expected value of a game. 
This is easy since we know all `possible outcomes` and their `respective probabilities of occurrence`. 
We can write these in the below table:

|Die value|Probability|Payout|Weighed payout|
|---|---|---|---|
|1|16.66%|0|0|
|2|16.66%|0|0|
|3|16.66%|1|0.1666|
|4|16.66%|2|0.3332|
|5|16.66%|3|0.4998|
|6|16.66%|4|0.6664|

By adding all the potential payouts weighed by their probability, we compute the expected value of playing this game $1.4494. 
- If we pay less to play the game, we will make money over time. 
- If we pay more, we lose in the long run. 

This example shows that in its simplest form, the value of an option is equal to the product of the payout profile and the associated probability distribution. 
Let’s visualise this by plotting  the values for our game in the following chart:


<img
  alt="A chart showing the outcome profile of the die game and the corresponding probabilities and probability-weighed expected payout values"
  className="screenshot--shadow screenshot--docs"
  src="/img/blog/2020-10-16/die-game-payout-profile.png"
/>
The orange line represents the possible (discrete) payouts for the game. 
The blue line is the probability for each outcome (die value) to occur. 
It is a straight line at 16.66% since each of the 6 values is equiprobable. 
The coloured area is the product of the first two lines. Its surface is the value of our option.

Of course, this is very simplified. 
I completely omit time value, which is the idea that you always wish you could hold the option for longer (at least for vanilla options, this is not necessarily the case for exotics). 
The reason time value exists has to do with the asymmetric payoff profile: there is more to win than to lose by waiting a little longer. 
Also, in real life, outcomes are rarely equiprobable. For example, stock prices are represented as a log-normal distribution.

As we have seen, the main element used by the meter to calculate the variable fare is the cab speed. To value the option, we need to build a representation of speed distribution.

## Modelling cab speed and option value

This can be done using a log-normal distribution, which is analogous to the normal distribution but cannot be negative. 
This fits well since cabs can only drive above 0mph. 

The log-normal distribution requires two parameters:
- the `mean`. The higher it is, the higher their expected earnings. 
- the `standard deviation`. It measures how much the achieved speed is likely to deviate from the mean. A higher standard deviation increases the value of the option due to the asymmetry of the payout.

If we overlay the distribution to the option payoff, we can see the option value below.

<img
  alt="A chart of call option payoff with the corresponding probability and weighed value area as overlay"
  className="screenshot--shadow screenshot--docs"
  src="/img/blog/2020-10-16/option-payoff-probability-value.png"
/>

Because of its log-normal nature, the distribution is skewed to the left. The mode (the highest point on the distribution, at around 10 mph) is lower than the mean (13 mph in the above).

Now that we are familiar with this representation, we can play with the parameters to get a quick grasp on the pricing dynamics.
Let's first vary the expected average speed and observe the effect on the distribution and expected option value:

<img
  alt="A chart showing how distribution of outcomes and value change with the expected mean"
  className="screenshot--shadow screenshot--docs"
  src="/img/blog/2020-10-16/payout-change-with-avg.png"
/>

Now let's vary the standard deviation and observe how this affects the distribution and expected option value:

<img
  alt="A chart showing how distribution of outcomes and value change with the standard deviation"
  className="screenshot--shadow screenshot--docs"
  src="/img/blog/2020-10-16/payout-change-with-stdev.png"
/>

Note how both a higher mean and a higher standard deviation result in higher option value. 

These sensitivities have names in traditional finance: the “greeks”. 
The change of value relative to the change of expected driving speed would be called the “delta”, and the change of 
value relative to the change of standard deviation (or volatility) would be called the “vega”. These are two examples of first order greeks. 
There are more greeks, of higher order, used to evaluate the risk of options portfolios.

## Estimating the value for drivers

Let’s first look at the average speed.

The NYC taxi dataset gives us the distance calculated by the meter, the pickup timestamp, and the dropoff timestamp. 
We can derive the ride duration as the difference between the two timestamps. 
Then, by dividing the distance by the duration, we can get the average speed. I calculate it with QuestDB using `SAMPLE BY` in monthly buckets and plot it below.  Over 10 years, it dropped a whopping 3.6 mph from 13.3 to 9.7mph.


<img
  alt="A chart showing the evolution of the average cab driver speed over time and how it consistently became inferior to the threshold"
  className="screenshot--shadow screenshot--docs"
  src="/img/blog/2020-10-16/average-speed-over-time.png"
/>


This number is a simplification since it assumes constant speed and no idle time. 
However, it is useful to calculate a lower-bound for earnings as follows. 

```Min Hourly Variable Fare = Max($30, Avg(speed) * $2.5)```

Similarly, we can estimate the upper bound of a driver’s hourly earnings by making assuming that the drivers are either stopped or accelerate instantly to the speed limit of 25mph.

```Max potential hourly variable fare = Distance component + Idle component```


```Distance component = Average ride distance * $2.50 / Average ride duration (hours)```

and

```Idle component = (25 - Average ride distance)/25mph * 60min * $0.50```

Lastly, we can calculate the actual variable fare over time as follows.

```Actual Hourly Variable Fare =avg(fare_amount - $2.50) / avg(duration_hours) ```

Here is what the three metrics look like over time (note we started the plot in September 2012 since cab prices were increased in August 2012. Interestingly, the average minimum variable fare has become a constant over time.

<img
  alt="A chart showing the evolution of the average cab driver potential fare range against the actual average fare"
  className="screenshot--shadow screenshot--docs"
  src="/img/blog/2020-10-16/potential-average-fare-range.png"
/>

If we also take into account standard deviation, we can start looking at speed distribution. Here is the log-normal distribution of speed over time obtained by overlaying the average and the standard deviation over time. For the vast majority of rides, drivers will average below 12mph.


<img
  alt="A chart showing the evolution of the distribution of NYC cab drivers' average speeds over time"
  className="screenshot--shadow screenshot--docs"
  src="/img/blog/2020-10-16/distribution-speed-over-time.png"
/>

If we put it all together, we can see how the economics have changed in the following chart, and how this affects the theoretical option value. Most of it due to the lower mean.

<img
  alt="A chart showing how the distribution of outcomes changes due to a lower mean, and the resulting change in option"
  className="screenshot--shadow screenshot--docs"
  src="/img/blog/2020-10-16/distribution-shift-with-lower-mean.png"
/>


Using the data we computed above, we can calculate the actual option value for drivers as follows.

```Option value = Hourly variable fare - Guaranteed component```

```Option value Actual = Actual Hourly Variable Fare - $30```

Here is how the option value changed over time. Slowly, but surely becoming an insignificant part in the driver’s earnings, mostly due to a slower average speed.

<img
  alt="A chart of the hourly fare earned by taxi drivers over the years broken down by whether it is fixed or variable"
  className="screenshot--shadow screenshot--docs"
  src="/img/blog/2020-10-16/variable-hourly-fare-over-time.png"
/>


I don’t have the data to tell why the average speed is lower, but I would think this could be attributed to more vehicles on the road as a result of Uber, Lyft, and other FHV, along with urban planning, for example cycle lanes making for less space on the road and more congestion.

The impact is significant. Over the past 10 years, increased traffic has cost up to $10 an hour per taxi. To put this in context, this means $29,000 per driver per year (8 hours a day, no holidays), or 300 million dollars a year for the NYC cab industry! And these are lower bound numbers. In reality, drivers share cabs. If we assume all of the 13,500 cabs are constantly on the road, this adds up to 1.2 billion dollars a year lost for the industry!

## Customers are losing too.

The pricing system was designed to align the interests of the drivers and the passengers. 
These incentives are almost gone today, and I think the pricing system is becoming counterproductive.

When the average driver could expect to drive at 13mph 10 years ago, their expected speed is now around 9mph, way below the 12mph threshold. 
This becomes pretty apparent when we overlay the two meter states over the average speed.

<img
  alt="A chart showing how the value of the incentive of driving customers faster has disappeared for NYC cab drivers"
  className="screenshot--shadow screenshot--docs"
  src="/img/blog/2020-10-16/incentive-value-evolution-over-time.png"
/>


So what incentives are left to drive customers around faster? 
The main one is the start fee of $2.50. Is it efficient at deterring bad behaviour? 
Well, that depends on the waiting time between two rides. 
If a driver can expect to wait less than 5 minutes between customers, the start fee still provides an incentive. 
Otherwise, it is economically more efficient to drive slowly and make the most of the current customer.

I don’t have data to estimate the waiting time for drivers between two rides. 
But in a world with increased supply (Uber, Lyft etc.), I think it is safe to assume that the wait time for drivers has increased. 
I don’t know for sure whether the wait time is above 5 minutes, but my guess is that it is. So the effect as a deterrent is somewhat nullified.

If drivers are uncertain about their likelihood of finding the next ride, 
and if the optional component of the fare has become an insignificant fraction of their earnings (most of which based on time being occupied), 
then it makes more sense to drive slow, and to hold on to the current customer for as long as possible. In the end, $30 an hour is better than 0.

## Your turn to explore the data

We made this dataset and the database available online. You can query it directly from your browser [here](http://try.questdb.io:9000/).
 
The dataset contains over 1.6 billion taxi rides, 700 million FHV rides (Uber, Lyft etc), and 10 years of weather and gas prices data. 
Feel free to explore it, come up with more analysis, and let me know your findings. 

In particular, it would be interesting to expand the analysis of the taxi dataset using the hourly weather data we uploaded with the demo.
In his analysis, Todd W Schneider concluded that the weather had no significant impact on demand. But doesn't it feel like 
when it's raining, traffic gets slower? With an equal demand, how does the weather affect the driver's speed, and in turn earnings? 
This is only one of the so many fascinating questions left to explore with this dataset.

Anyway, I hope your found this interesting. If you like this post, please consider visiting our Github page and leaving a star.
