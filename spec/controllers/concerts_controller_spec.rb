require 'rails_helper'

RSpec.describe ConcertsController, type: :controller do

	describe 'TOPページ' do
      context "Concerts#Index OK" do
        before do
          get :index
        end
        it 'REQUEST 200 OK!' do
          expect(response.status).to eq 200
        end
      end
    end

    describe 'SHOWページ' do
      context "Concerts#SHOW OK" do
        before do
          @concert = FactoryBot.create(:concert)
        end
        it 'REQUEST 200 OK!' do
        	get :show, params: { id: @concert.id }
        	expect(response.status).to eq 200
        end
      end
    end

end
