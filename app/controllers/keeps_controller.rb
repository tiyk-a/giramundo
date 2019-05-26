class KeepsController < ApplicationController
  before_action :set_keep, only: [:show, :edit, :update, :destroy]

  # GET /keeps
  # GET /keeps.json
  def index
    @keeps = Keep.all
  end

  # GET /keeps/1
  # GET /keeps/1.json
  def show
  end

  # GET /keeps/new
  def new
    @keep = Keep.new
  end

  # GET /keeps/1/edit
  def edit
  end

  # POST /keeps
  # POST /keeps.json
  def create
    @keep = Keep.new(keep_params)

    respond_to do |format|
      if @keep.save
        format.html { redirect_to @keep, notice: 'Keep was successfully created.' }
        format.json { render :show, status: :created, location: @keep }
      else
        format.html { render :new }
        format.json { render json: @keep.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /keeps/1
  # PATCH/PUT /keeps/1.json
  def update
    respond_to do |format|
      if @keep.update(keep_params)
        format.html { redirect_to @keep, notice: 'Keep was successfully updated.' }
        format.json { render :show, status: :ok, location: @keep }
      else
        format.html { render :edit }
        format.json { render json: @keep.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /keeps/1
  # DELETE /keeps/1.json
  def destroy
    @keep.destroy
    respond_to do |format|
      format.html { redirect_to keeps_url, notice: 'Keep was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_keep
      @keep = Keep.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def keep_params
      params.require(:keep).permit(:concert_id, :user_id)
    end
end
