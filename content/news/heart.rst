Heart
=====

:date:      2016-07-13
:author:    sfiera
:tags:      antares, preview

Oops, it’s been more than a year since the last post. As always, work is
ongoing, but not quickly. Planned for the next release are better Linux
support and a more modern plugin format.

Perhaps a future post will discuss what problems I think the current
plugin format has, but in lieu of that, here’s a quick preview of what
the new set of tools would use:

..  code-block:: procyon

    type:       "solo"
    chapter:    4
    title:
      > \i Chapter 2 
      | \iThe Stars Have Ears
      !
    players:
      * type:           "human"
        race:           "ish"
        name:           "The Human/Ishiman Cooperative"
        earning_power:  0.004
      * type:  "cpu"
        race:  "gai"
        name:  "The Gaitori Union"
    score:
      * "-Destroy all 4"
      * "_-relay dishes."
      * "4\\0\\0\\4\\f\\t\\Remaining: \\/4"
    song:       5001
    initials:
      * base:     "loc/relay"
        owner:    1
        rename:   "Relay Dish 1"
        at:       {x: 7043, y: 4521}
        earning:  1.0
      * base:        "ish/hvc"
        owner:       0
        at:          {x: 7652, y: 8695}
        attributes:  {is_player_ship: true}
      * base:        "gai/cruiser"
        owner:       1
        at:          {x: 6434, y: 4695}
        target:      0
        attributes:  {static_destination: true}
      * base:        "gai/cruiser"
        owner:       1
        at:          {x: 2608, y: 2086}
        target:      16
        attributes:  {static_destination: true}
      * base:        "gai/cruiser"
        owner:       1
        at:          {x: 3739, y: 2434}
        target:      16
        attributes:  {static_destination: true}
      * base:        "gai/gunship"
        owner:       1
        at:          {x: -347, y: -1913}
        target:      17
        attributes:  {static_destination: true}
      * base:        "gai/cruiser"
        owner:       1
        at:          {x: -1130, y: -2347}
        target:      17
        attributes:  {static_destination: true}
      * base:        "gai/cruiser"
        owner:       1
        at:          {x: -347, y: -2782}
        target:      17
        attributes:  {static_destination: true}
      * base:        "gai/gunship"
        owner:       1
        at:          {x: -1043, y: -5043}
        target:      18
        attributes:  {static_destination: true}
      * base:        "gai/cruiser"
        owner:       1
        at:          {x: -2695, y: -4173}
        target:      18
        attributes:  {static_destination: true}
      * base:        "gai/cruiser"
        owner:       1
        at:          {x: -1826, y: -4434}
        target:      18
        attributes:  {static_destination: true}
      * base:        "gai/cruiser"
        owner:       1
        at:          {x: -1913, y: -4956}
        target:      18
        attributes:  {static_destination: true}
      * base:        "obi/escort"
        owner:       0
        at:          {x: -8695, y: 6782}
        target:      1
        attributes:  {initially_hidden: true}
      * base:        "obi/escort"
        owner:       0
        at:          {x: -6695, y: 8347}
        target:      1
        attributes:  {initially_hidden: true}
      * base:             "loc/bunker"
        owner:            1
        rename:           "Myrmidon Station"
        at:               {x: -1652, y: -4173}
        earning:          1.0
        sprite_override:  1200
      * base:    "loc/sun"
        rename:  "Myrmidon"
        at:      {x: 0, y: 0}
      * base:     "loc/relay"
        owner:    1
        rename:   "Relay Dish 2"
        at:       {x: 3217, y: 2000}
        earning:  1.0
      * base:     "loc/relay"
        owner:    1
        rename:   "Relay Dish 3"
        at:       {x: 2000, y: -1130}
        earning:  1.0
      * base:     "loc/relay"
        owner:    1
        rename:   "Relay Dish 4"
        at:       {x: 1043, y: -4347}
        earning:  1.0
    conditions:
      * type:        "counter"
        op:          "eq"
        action:
          * type:    "win"
            player:  0
            next:    5
            message:
              > Mission completed. You destroyed all four of the sensor relay dishes.
        persistent:  true
        disabled:    false
        player:      0
        counter:     0
        value:       4
      * type:        "destroyed"
        op:          "eq"
        action:
          * type:    "win"
            player:  1
            message:
              > You lost your heavy cruiser, failing to destroy all four relay dishes.
        persistent:  false
        disabled:    false
        initial:     1
        value:       true
      * type:        "destroyed"
        op:          "eq"
        action:
          * type:       "reveal"
            reflexive:  true
            which:      12
          * type:       "reveal"
            reflexive:  true
            which:      13
          * type:       "message"
            reflexive:  true
            delay:      120
            message:
              * > \i INCOMING TRANSMISSION \i SECURE KEY OK - NW3 TIGHT BEAM
                | SOURCE: OMV Treejumper, Escort 3856
                | Humans: your bravery has impressed us. We are honored to offer our
                > assistance in the destruction of the relay dishes. Stand by. \i<EOT>\i 
        persistent:  false
        disabled:    false
        initial:     17
        value:       true
    briefings:
      * object:  15
        title:   "Myrmidon"
        content:
          > The Gaitori in this system have deployed a series of long-range scanner
          > relay dishes, designed to gather information on our ship movements.
          >
          > You are to put an end to this intrusion by destroying all four relay
          > stations.
      * object:  1
        title:   "Cruiser"
        content:
          > ^Pish/hvc^You'll be dropped in here. Your only ship for this mission is
          > this heavy cruiser. It's speedier than the standard cruiser, and has an
          > improved rapid-fire fusion pulse gun. Save your guided missiles for
          > difficult targets. If you lose the cruiser, the mission will be aborted.
      * object:  0
        title:   "Relay Dish 1"
        content:
          > ^Ploc/relay^This the the first of the four Relay Stations you should
          > destroy. The stations are unarmed, and are only protected by deflector
          > shields.
      * object:  2
        title:   "Cruiser"
        content:
          > ^Pgai/cruiser^There are Gaitori cruisers stationed at each dish. Their
          > cruisers are slow, but are armed with rapid-fire concussive pellet guns. 
      * object:  16
        title:   "Relay Dish 2"
        content:
          > This is dish is your second target.
      * object:  17
        title:   "Relay Dish 3"
        content:
          > The third dish is your next target.
          | ^Pgai/gunship^This dish is being guarded by a gunship. Gaitori gunships
          > are not heavily armored, but they have converted atomic pulse mining
          > guns, which fire powerful long-range homing pulses.
      * object:  18
        title:   "Relay Dish 4"
        content:
          > This is the last Relay Station you should destroy. With a gunship and
          > two cruisers nearby, it's the most heavily guarded.
      * object:  14
        title:   "Myrmidon Station"
        content:
          > ^Pbrf/habitat^The Gaitori habitat station in the Myrmidon System is
          > heavily armed. We recommend that you keep a safe distance from this
          > station.
      * title:  "Obish Escorts"
        content:
          > ^Pobi/escort^A pair of Obish escorts is in the region. They've expressed
          > an interest in aiding us in destroying the Relay Stations, but have
          > indicated that they would like to observe your progress first. They may
          > choose to join you during the mission. The Obish Escorts have Salrilian
          > stealth fields and Ishiman core pulse guns.
    starmap:    {x: 393, y: 282}
    par_time:   120
    par_kills:  10
    no_ships:
      > Your ship was destroyed. We cannot supply you with vessels if you are
      > this poor a pilot.
