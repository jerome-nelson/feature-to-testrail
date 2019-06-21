@fe @obg_desktop @guarded_pages
Feature: Guarded Pages
	In order to access guarded pages
	As a user
	I want to ensure that I am able to access guarded pages only logged in

@Test @QA @Prod @Alpha
	Scenario Outline: Account Settings Navigation to Guarded Pages mga customer
		Given a setup for '<application>'.'com' on 'Desktop'
        When I load lobby '<url>' through URL
        And I log in with user 'autoguardedpages@testsson.one' and password 'Tester123' on guarded pages
        Then page '<loadedPage>' should load
		And I am redirected to URL containing '<url>'
    
    @smoke
		Examples:
		| application | loadedPage        | url                                   |
		| nordicbet   | AccountSettings   | account-settings/change-password      |
		| nordicbet   | ResponsibleGaming | responsible-gaming/deposit-limit      |
		| nordicbet   | MarketingSettings | marketing-settings/marketing-consents |
		| betsson     | AccountSettings   | account-settings/change-password      |
		| betsson     | MarketingSettings | marketing-settings/marketing-consents |
		| betsson     | ResponsibleGaming | responsible-gaming/deposit-limit      |
		| betsafe     | MarketingSettings | marketing-settings/marketing-consents |
		| betsafe     | AccountSettings   | account-settings/change-password      |
		| betsafe     | ResponsibleGaming | responsible-gaming/deposit-limit      |

		Examples:
		| application | loadedPage         | url                                |
		| nordicbet   | AccountSettings    | account-settings/my-profile        |
		| nordicbet   | MarketingSettings  | marketing-settings/cookie-settings |
		| nordicbet   | TransactionHistory | transaction-history/payments       |
		| nordicbet   | TransactionHistory | transaction-history/activity       |
		| nordicbet   | Bonuses            | bonuses                            |
		| nordicbet   | Bonuses            | bonuses/ended                      |
		| nordicbet   | Messages           | messages/expired                   |
		| nordicbet   | ResponsibleGaming  | responsible-gaming/self-exclusion  |
		| nordicbet   | Verification       | verification                       |
		| nordicbet   | TransactionHistory | transaction-history                |
		| nordicbet   | Balance            | balance                            |
		| nordicbet   | Bonuses            | bonuses/active                     |
		| nordicbet   | Messages           | messages                           |
		| betsson     | Balance            | balance                            |
		| betsson     | TransactionHistory | transaction-history                |
		| betsson     | Bonuses            | bonuses/active                     |
		| betsson     | Messages           | messages                           |
		| betsson     | Verification       | verification                       |
		| betsson     | AccountSettings    | account-settings/my-profile        |
		| betsson     | MarketingSettings  | marketing-settings/cookie-settings |
		| betsson     | TransactionHistory | transaction-history/payments       |
		| betsson     | TransactionHistory | transaction-history/activity       |
		| betsson     | Bonuses            | bonuses                            |
		| betsson     | Bonuses            | bonuses/ended                      |
		| betsson     | Messages           | messages/expired                   |
		| betsson     | ResponsibleGaming  | responsible-gaming/self-exclusion  |
		| betsafe     | AccountSettings    | account-settings/my-profile        |
		| betsafe     | MarketingSettings  | marketing-settings/cookie-settings |
		| betsafe     | TransactionHistory | transaction-history/payments       |
		| betsafe     | TransactionHistory | transaction-history/activity       |
		| betsafe     | Bonuses            | bonuses                            |
		| betsafe     | Bonuses            | bonuses/ended                      |
		| betsafe     | Messages           | messages/expired                   |
		| betsafe     | ResponsibleGaming  | responsible-gaming/self-exclusion  |
		| betsafe     | Balance            | balance                            |
		| betsafe     | TransactionHistory | transaction-history                |
		| betsafe     | Bonuses            | bonuses/active                     |
		| betsafe     | Messages           | messages                           |
		| betsafe     | Verification       | verification                       |

@Test @QA @Prod @Alpha
	Scenario Outline: Account Settings Guarded Pages mga customer for UKGC pages
		Given a setup for '<application>'.'com' on 'Desktop'
        When I load lobby '<url>' through URL
        And I log in with user 'autoguardedpages@testsson.one' and password 'Tester123' on guarded pages
        Then page '<loadedPage>' should load
		And I am redirected to URL containing '<directedToURL>'
    
    @smoke
		Examples:
		| application | loadedPage        | url                              | directedToURL                  |
		| betsson     | ResponsibleGaming | responsible-gaming/time-off      | responsible-gaming/information |
		| betsson     | ResponsibleGaming | responsible-gaming/reality-check | responsible-gaming/information |
		| betsafe     | ResponsibleGaming | responsible-gaming/time-off      | responsible-gaming/information |
		| betsafe     | ResponsibleGaming | responsible-gaming/reality-check | responsible-gaming/information |

@Test @QA @Prod @Alpha
	Scenario Outline: Account Settings Navigation Guarded Pages ukgc customer
		Given a setup for '<application>'.'com' on 'desktop'
        When I load lobby '<url>' through URL
        And I log in with user 'autoguardedpages1@testsson.one' and password 'Tester123' on guarded pages
		Then page '<loadedPage>' should load
        And I am redirected to URL containing '<url>'

		Examples:
		| application | loadedPage        | url                              |
		| betsson     | ResponsibleGaming | responsible-gaming/time-off      |
		| betsafe     | ResponsibleGaming | responsible-gaming/time-off      |
		| betsson     | ResponsibleGaming | responsible-gaming/reality-check |
		| betsafe     | ResponsibleGaming | responsible-gaming/reality-check |