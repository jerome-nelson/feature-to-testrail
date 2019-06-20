@fe @obg_desktop @account_settings @change_password
Feature: Change Password
	In order go to Change Password settings
	As a user
	I want to ensure that the Change Password functionality works 
	
@smoke @Test @QA @Prod @Alpha
	Scenario Outline: Change Password successfully
		Given a setup for '<application>'.'com' on 'Desktop'
		And I am in Home page
		When I log in with user 'qatestautochangepass@testsson.one' and password 'Tester123' for change password
		And I log out
		And I log in with user 'qatestautochangepass@testsson.one' and new password
		Then the user should be logged in successfully

		Examples:
		| application |
		| nordicbet   |
		| betsson     |
		| betsafe     |

@smoke @Test @QA @Prod @Alpha
	Scenario Outline: Mismatched input fields between new password and confirm password fields
		Given a setup for '<application>'.'com' on 'Desktop'
		And I am in Home page
		When I log in with user 'qatestautochangepasserror@testsson.one' and password 'Tester123'
        And I load lobby 'account-settings/change-password' through URL
		And I fill in mismatched password details
		Then error message 'New and confirm passwords do not match.' should be displayed

		Examples:
		| application |
		| nordicbet   |
		| betsson     |
		| betsafe     |
