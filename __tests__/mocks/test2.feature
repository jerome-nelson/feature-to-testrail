@fe @obg_desktop @account_verification
Feature: Account Verification
	In order to access the KYC iframe
	As a user
	I want to ensure that the Verification functionality works 

@smoke @Test @QA @Prod @Alpha
	Scenario Outline: Access KYC iframe After Logging in From Login Popup
		Given a setup for '<application>'.'com' on 'Desktop'
		When I load lobby 'verification' through URL
		Then verification content should be displayed
	
		Examples:
		| application |
		| nordicbet   |
        #TODO add betsafe and betsson OBGD-3486

@Test @QA @Alpha @Prod
    Scenario Outline: KYC Requested Popup From Casino Pages Navigates to Lobby/Verification Page for UKGC Customer
		Given a setup for '<application>'.'com' on 'Desktop'
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