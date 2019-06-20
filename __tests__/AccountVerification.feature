@fe @obg_desktop @account_verification
Feature: Account Verification
	In order to access the KYC iframe
	As a user
	I want to ensure that the Verification functionality works 

@smoke @Test @QA @Prod @Alpha
	Scenario Outline: Access KYC iframe After Logging in From Login Popup
		Given a setup for '<application>'.'com' on 'Desktop'
		When I load lobby 'verification' through URL
		And I log in with user 'qatestautomationverification@testsson.one' and password 'Tester123'
		Then verification content should be displayed
	
		Examples:
		| application |
		| nordicbet   |
        #TODO add betsafe and betsson OBGD-3486

@Test @QA @Alpha @Prod
    Scenario Outline: KYC Requested Popup From Casino Pages Navigates to Lobby/Verification Page for UKGC Customer
		Given a setup for '<application>'.'com' on 'Desktop'
        And I am logged in with user 'autokycrequested@testsson.one' and password 'Tester123'
        When I load lobby '<url>' through URL 		
        And I click button '<button>'
        Then page '<loadedPage>' should load
        And I am redirected to URL containing '<urlDirected>'
        
    @smoke
        Examples:
        | application | button           | url                                     | loadedPage   | urlDirected                 |
        | betsson     | Remind me later  | casino/slots/hood                       | HomeBetsson  | betsson.com/en/             |
        | betsson     | Upload documents | casino/slots/hood                       | Verification | betsson.com/en/verification |
        | betsson     | Remind me later  | live-casino/live-roulette/live-roulette | HomeBetsson  | betsson.com/en/             |
        | betsson     | Upload documents | live-casino/live-roulette/live-roulette | Verification | betsson.com/en/verification |
        | betsafe     | Remind me later  | casino/slots/hood                       | HomeBetsafe  | betsafe.com/en/             |
        | betsafe     | Upload documents | casino/slots/hood                       | Verification | betsafe.com/en/verification |
        | betsafe     | Remind me later  | live-casino/live-roulette/live-roulette | HomeBetsafe  | betsafe.com/en/             |
        | betsafe     | Upload documents | live-casino/live-roulette/live-roulette | Verification | betsafe.com/en/verification |

@Test @QA @Alpha @Prod
	Scenario Outline: KYC Requested Popup Navigates to Lobby/Verification Page for UKGC Customer
		Given a setup for '<application>'.'com' on 'Desktop'
        When I load lobby '<url>' through URL 
		And I log in with user 'autokycrequested@testsson.one' and password 'Tester123'
        And I click button '<button>'
        Then page '<loadedPage>' should load
        And I am redirected to URL containing '<urlDirected>'
	
    @smoke
		Examples:
		| application | button           | url        | loadedPage   | urlDirected                             |
		| betsson     | Remind me later  | Deposit    | HomeBetsson  | betsson.com/en/?returnUrl=%2Fdeposit    |
		| betsson     | Upload documents | Deposit    | Verification | betsson.com/en/verification             |
		| betsson     | Remind me later  | Withdrawal | HomeBetsson  | betsson.com/en/?returnUrl=%2Fwithdrawal |
		| betsson     | Upload documents | Withdrawal | Verification | betsson.com/en/verification             |
		| betsafe     | Remind me later  | Deposit    | HomeBetsafe  | betsafe.com/en/?returnUrl=%2Fdeposit    |
		| betsafe     | Upload documents | Deposit    | Verification | betsafe.com/en/verification             |
		| betsafe     | Remind me later  | Withdrawal | HomeBetsafe  | betsafe.com/en/?returnUrl=%2Fwithdrawal |
		| betsafe     | Upload documents | Withdrawal | Verification | betsafe.com/en/verification             |

        Examples:
        | application | button           | url            | loadedPage   | urlDirected                 |
        #TODO TA-1031
        #| betsson     | Remind me later  | Virtual-Sports | HomeBetsson  | betsson.com/en/             |
        #| betsson     | Upload documents | Virtual-Sports | Verification | betsson.com/en/verification |
        | betsson     | Remind me later  | Poker          | HomeBetsson  | betsson.com/en/             |
        | betsson     | Upload documents | Poker          | Verification | betsson.com/en/verification |
        | betsafe     | Remind me later  | Virtual-Sports | HomeBetsafe  | betsafe.com/en/             |
        | betsafe     | Upload documents | Virtual-Sports | Verification | betsafe.com/en/verification |
        | betsafe     | Remind me later  | Poker          | HomeBetsafe  | betsafe.com/en/             |
        | betsafe     | Upload documents | Poker          | Verification | betsafe.com/en/verification |

@smoke @Test @QA @Prod @Alpha
	Scenario Outline: KYC None Popup Navigates to Lobby Page for UKGC Customer
        Given a setup for '<application>'.'com' on 'Desktop'
        When I load lobby '<url>' through URL 
		And I log in with user 'autokycnone@testsson.one' and password 'Tester123'
        And I click button 'OK'
        Then page '<loadedPage>' should load
        And I am redirected to URL containing '<urlDirected>'
	
    @smoke
		Examples:
		| application | url        | loadedPage  | urlDirected                             |
		| betsson     | Deposit    | HomeBetsson | betsson.com/en/?returnUrl=%2Fdeposit    |
		| betsson     | Withdrawal | HomeBetsson | betsson.com/en/?returnUrl=%2Fwithdrawal |
		| betsafe     | Deposit    | HomeBetsafe | betsafe.com/en/?returnUrl=%2Fdeposit    |
		| betsafe     | Withdrawal | HomeBetsafe | betsafe.com/en/?returnUrl=%2Fwithdrawal |

        Examples:
        | application | url            | loadedPage  | urlDirected     |
        #TODO TA-1031
        #| betsson     | Virtual-Sports | HomeBetsson | betsson.com/en/ |
        | betsson     | Poker          | HomeBetsson | betsson.com/en/ |
        | betsafe     | Virtual-Sports | HomeBetsafe | betsafe.com/en/ |
        | betsafe     | Poker          | HomeBetsafe | betsafe.com/en/ |

@regression @Test @QA @Prod @Alpha @ignore
#TODO OBGD-1997
	Scenario Outline: Go to Verification iFrame Contains Correct Fields
		Given a setup for '<application>'.'<site>' on '<device>'
		And I log in with user 'qatestautomationverification@testsson.one' and password 'Tester123'
		When I navigate to the 'AccountSettings' page through the user summary
		And I navigate to section 'Verification' from Account Settings
		Then the KYC iframe should contain the following sub-headings:
		| Heading          |
		| ProofofID        |
		| ProofofResidence |

		And the following document types should be displayed:
		| Type             |
		| IDCard           |
		| DrivingLicense   |
		| Passport         |
		| Proofofresidence |
	
		Examples:
		| application | site | device  |
		| nordicbet   | com  | Desktop |

@regression @Test @QA @Prod @Alpha @ignore
#TODO OBGD-1997
	Scenario Outline: Select a KYC Document
		Given a setup for '<application>'.'<site>' on '<device>'
		And I log in with user 'qatestautomationverification@testsson.one' and password 'Tester123'
		When I navigate to the 'AccountSettings' page through the user summary
		And I navigate to section 'Verification' from Account Settings
		And I click on a KYC document type button '<type>'
		Then the popup should be displayed to upload a document

		Examples:
		| application | site | device  | type             |
		| nordicbet   | com  | Desktop | IDCard           |
		| nordicbet   | com  | Desktop | DrivingLicense   |
		| nordicbet   | com  | Desktop | Passport         |
		| nordicbet   | com  | Desktop | Proofofresidence |
