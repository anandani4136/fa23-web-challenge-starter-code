import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, SafeAreaView, SectionList } from 'react-native-web';
import MainHeader from "../components/main-header";
import styles from "../styles/index.module.scss";

function Index() {
    
    const [events, setEvent] = useState([]);                            //The events state variable define the event data fetched from the API
    const [miniEventText, setMiniEventText] = useState([]);
    const [mealEventText, setMealEventText] = useState([]);             //Remaining state variables store the header titles per event
    const [speakerEventText, setSpeakerEventText] = useState([]);       //   staying empty if that event does not exist, and populated
    const [workshopEventText, setWorkshopEventText] = useState([]);     //   if such an event exists
    const [qnaEventText, setQnaEventText] = useState([]);
    const [otherEventText, setOtherEventText] = useState([]);
                                                                                    //(https://docs.hackillinois.org/reference/services/Event/#post-event)
    const eventTypes = ["MINIEVENT", "MEAL", "SPEAKER", "WORKSHOP", "QNA", "OTHER"] //Set of all valid event types in the API 
    let existingEventTypes = []                                         //List of event type strings that populates based on event type existance
                                                                        //   (if an event type is not found, it will not be inserted into existingEventTypes)
    let eventResults = [];
    let miniEventResults = [];
    let mealEventResults = [];
    let speakerEventResults = [];                                       //HTML elements will populate these arrays so to fill each respective
    let workshopEventResults = [];                                      //      event type if found
    let qnaEventResults = [];
    let otherEventResults = [];

    //GET data from the Hack Illinois API as JSON – then send it to the 
    //  event state variable
    //PRE: The Hack Illinois API returns valid JSON data, contains
    //  events data, or data is incorrectly formatted/empty
    //POST: If the provided data is accurate, then the event
    //  state variable is updated, otherwise an error is caught
    async function getAPIData(){
        try {
            const response = await fetch('https://api.hackillinois.org/event/');
            const json = await response.json();
            setEvent(json.events);
        } catch (error) {
            console.error(error);
        }
    }

    //Check each valid header type to validate its existence – then change 
    //  title name to make it visible on the front end
    //PRE: existingEventTypes is populated with eventTypes found from 
    //  existing events
    //POST: The state of each Event Type Category Text is populated
    //  if it is an existing event, left blank otherwise
    function getExistingHeaders(){
        if(existingEventTypes.includes("MINIEVENT")){
            setMiniEventText("Mini Event! 📅")
        } 
        if (existingEventTypes.includes("MEAL")) {
            setMealEventText("🥪 Meals!🍕")
        } 
        if (existingEventTypes.includes("SPEAKER")) {
            setSpeakerEventText("Speakers 🗣");
        } 
        if (existingEventTypes.includes("WORKSHOP")) {
            setWorkshopEventText("Workshops! 🛠");
        } 
        if (existingEventTypes.includes("QNA")) {
            setQnaEventText("Q & A ✋");
        } 
        if (existingEventTypes.includes("OTHER")) {
            setOtherEventText("👀ther");
        }
    }

    //Check the eventType to assign eventResults HTML data to 
    //  its respective event's HTML element array
    //PRE: eventResults is populated with the HTML created for each 
    //  existing event, valid eventType data is passed
    //POST: The state of each event's HTML element array is populated
    //  if it is an existing event, left blank otherwise
    function organizeByEventType(eventType) {
        if(eventType == "MINIEVENT") {
            miniEventResults = eventResults;
        } else if (eventType == "MEAL") {
            mealEventResults = eventResults;
        } else if (eventType == "SPEAKER") {
            speakerEventResults = eventResults;
        } else if (eventType == "WORKSHOP") {
            workshopEventResults = eventResults;
        } else if (eventType == "QNA") {
            qnaEventResults = eventResults;
        } else {
            otherEventResults = eventResults;
        }
    }

    //Format the event's date and time into a readable format 
    //PRE: Valid event data is passed, with startTime and endTime
    //  in epoch time
    //POST: A formatted date string is returned if a startTime is 
    //  found, left blank otherwise
    function formatEventTime(event) {
        if(event.startTime != 0){
            let start_time = new Date(0);
            start_time.setUTCSeconds(event.startTime);
            let end_time = new Date(0);
            end_time.setUTCSeconds(event.endTime);
            return ("On "+start_time.toLocaleDateString()+ " from "+start_time.toLocaleTimeString() + " to " + end_time.toLocaleTimeString());
        }
        return "";
    }

    //Create valid HTML element per existing event
    //PRE: Valid event data is passed
    //POST: Based on specific keywords and data tags, the event data is modified and passed
    //  as HTML mode into the eventResults array
    function createEvent(event){
        existingEventTypes.push(event.eventType);                       //Add event type to existingEventTypes since it is an existing event
        let event_description = event.description;
        let event_fact = ""                                             //declaring all possible value fields used in the event HTML
        let event_sponsor = event.sponsor;                              //Immutable values initialized directly
        let event_link = "";                                            //Conditonal values left empty 
        let event_link_name = "";
        let event_time = formatEventTime(event);                        //Formats time based on event startTime (if exists)

        
        if((event_description).includes("https:")) {                    //Checks URLs in description and converts them to links

            let index = event_description.indexOf("https:");
            let preIndex = index;
            if((event_description).includes("Event Link:")){            //Special case of removing the "Event Link:" tag before the URL
                preIndex = event_description.indexOf("Event Link:");    //Where a seperate index is defined to parse that tag out
            }
            event_description = event_description.substring(0, preIndex);
            event_link = (event.description).substring(index, event.description.length - 1);
            event_link_name = "Link To Join"
        }
        if((event_description).includes("Fun fact:")) {                 //Checks for a "Fun fact:" key to parse out that data seperately
            let index = event_description.indexOf("Fun fact:");         //and format it to make the information more interesting
            let event_description_copy = event_description
            event_description = event_description.substring(0, index);
            event_fact = (event_description_copy).substring(index, event_description_copy.length - 1);
        }

        
        eventResults.push(                                             //HTML element is constructed using predefined CSS styles and state values
            <div key={event.id} className={styles.gridBox}>
                <div className={styles.containerDesign}>
                    <h2 className={styles.eventTitle}>{event.name}</h2>
                    <h2 className={styles.eventDesc}>{event_description}
                    <a className={styles.eventLink} href={event_link}>{event_link_name}</a>
                    </h2>
                    <h2 className={styles.eventFact}>{event_fact}</h2>
                    <hr />
                    <h2 className={styles.eventSponsor}>{event_sponsor}</h2>
                    <h2 className={styles.eventTime}>{event_time}</h2>
                </div>
            </div>,
        );
    }

    
    eventTypes.forEach(eventType => {
        events.forEach(event => {
            if(event.eventType == eventType) {
                createEvent(event)
            }
        });
        organizeByEventType(eventType);
        eventResults = [];
    });


    useEffect(() => {
        getAPIData();
        getExistingHeaders()
    }, []);

    return (
        <>
            <MainHeader />
            <div className={styles.mainPage}>
                <br></br>
                <br></br>
                <p id="speakers" className={styles.text_shadows}>{speakerEventText}</p>
                <div>
                    {speakerEventResults}
                </div>
                <p id="workshops" className={styles.text_shadows}>{workshopEventText}</p>
                <div>
                    {workshopEventResults}
                </div>
                <p id="miniEvents" className={styles.text_shadows}>{miniEventText}</p>
                <div>
                    {miniEventResults}
                </div>
                <p id="meals" className={styles.text_shadows}>{mealEventText}</p>
                <div>
                    {mealEventResults}
                </div>
                <p id="qnas" className={styles.text_shadows}>{qnaEventText}</p>
                <div>
                    {qnaEventResults}
                </div>
                <p id="others" className={styles.text_shadows}>{otherEventText}</p>
                <div>
                    {otherEventResults}
                </div>
                <p className={styles.hackIllinoisBicycle} ></p>
                <p className={styles.hackIllinois2} ></p>
            </div>
        </>
    );
};

export default Index;
