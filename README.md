THE FOLLOWING REPOSITORY CONTAINS A NEXT JS PROJECT BOOTSTRAPPED USING CREATE-NEXT-APP. THE IDEA BEHIND THE APP IS TO BUILD A SIMPLE AND EASY TO USE TRIP PLANNER. THE APP IS BUILT ON TOP OF THE TRANSPORT REST API FOR DEUTSCHE BAHN. THE USER HAS TO ENTER HIS / HER CHOICE OF ORIGIN , DESTINATION, DATE AND TIME FOR TRAVEL TO SEARCH FOR ALL POSSIBLE CONNECTIONS (ALL MODES) FOR THE CHOSEN DATE AND TINE.

TO KEEP THE APP EXTREMELY SIMPLE, I HAVE LIMITED THE NUMBER OF JOUNREY RESULTS TO ONLY BE 5. SIMILARLY FOR THE ORIGIN AND DESTINATION INPUT FIELDS, I HAVE ADDED THE FLEXIBILITY OF AUTOCOMPLETE. WHAT THIS MEANS IS THAT THE USER CAN START SEARCHING FOR A STOP AND THE POSSIBLE STOPS WOULD BE FETCHED REAL TIME FROM THE API AND DISPLAYED AS A DROPDOWN TO THE USER. AGAIN FOR SIMPLICITY PURPOSE THE NUMBER OF RESULTS RETURNED AND DISPLAYED HAS BEEN LIMITED TO BE 5. 

THE CHOICE OF PACKAGES ARE AS SUCH:

1) MATERIAL UI HAS BEEN CHOSEN AS THE FRONTEND CSS FRAMEWORK AS PERSONALLY I LIKE THE DOCUMENTATION AND EASE OF USE OF THE VARIOUS COMPONENTS
2) NEXT JS HAD BEEN CHOSEN FOR DEVELOPING THE APP FULL STACK. REASON BEING THE AMAZING PAGES FEATURE AND THE SSR FUNCTIONALITY WHICH IS BUILT ON TOP OF THE REACT FRAMEWORK
3) MOMENT.JS IS USED TO MANIPULATE DATE AND TIME AS IT IS ONE OF THE BEST PACKAGES TO WORK WITH DATE AND TIME.
4) NOTISTACK HAS BEEN USED TO PROVIDE THE USER WITH FEEDBACK IF ERRORS OCCUR

HOW TO RUN THE CODE ?
1. FIRST CLONE THE PROJECT TO YOUR WORKSPACE USING GIT CLONE git@github.com:Kasheesh-PrabhuDesai/trip-planner.git
2. RUN YARN DEV TO START THE DEVELOPMENT SERVER 

TO MAKE TESTING THE APP EVEN SIMPLER I HAVE ALREADY DEPLOYED THE FOLLOWING APP TO VERCEL. THE DEPLOYED APP CAN BE FOUND ON https://trip-planner-bay.vercel.app/
