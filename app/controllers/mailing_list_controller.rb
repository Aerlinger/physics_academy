
class MailingListController < ApplicationController

  def submit
    
    @subscribed_email = MailingList.new(email: params[:subscribe_email])

    if @subscribed_email.save
      respond_to do |format|
        format.js { render template: "mailing_list/submit" }
      end
    else
      respond_to do |format|
        format.js { render template: "mailing_list/error" }
      end
    end

  end

  def remove
  end

end
