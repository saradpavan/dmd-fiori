using { migration as db } from '../db/schema';

service DatamigrationService {

  /* =======================
  Waves
  ======================= */
  entity Waves as projection on db.Waves {
    ID,
    name,
    startDate,
    endDate,
    actualStartDate,
    actualEndDate,
    status,

    case
      when status = 'COMPLETED'     then 3
      when status = 'IN_PROGRESS'  then 2
      when status = 'ON_HOLD'       then 1
      when status = 'YET_TO_START' then 5
      else 0
    end as StatusCriticality : Integer,

    rag,
    case
      when rag = 'G' then 3
      when rag = 'A' then 2
      when rag = 'R' then 1
      else 0
    end as ragCriticality : Integer,

    completionPercent,
    case
      when completionPercent >= 70 then 3
      when completionPercent >= 40 then 2
      else 1
    end as progressCriticality : Integer,

    rollouts : redirected to Rollouts
  };


  /* =======================
  Rollouts
  ======================= */
  entity Rollouts as projection on db.Rollouts {
    ID,
    name,
    status,

    case
      when status = 'COMPLETED'     then 3
      when status = 'IN_PROGRESS'  then 2
      when status = 'ON_HOLD'       then 1
      when status = 'YET_TO_START' then 5
      else 0
    end as StatusCriticality : Integer,

    startDate,
    actualStartDate,
    reason,
    lastModifiedAt,

    waves : redirected to Waves,
    mocks : redirected to Mocks
  };


  /* =======================
    Mocks
  ======================= */
  @readonly
  entity Mocks as projection on db.Mocks {
    ID,
    name,

    @Common.Text: StatusText
    @Common.TextArrangement: #TextOnly
    status as status,

    case
      when status = 'COMPLETED'    then 'Completed'
      when status = 'IN_PROGRESS'  then 'In Progress'
      when status = 'ON_HOLD'      then 'On Hold'
      when status = 'YET_TO_START' then 'Yet to Start'
      else status
    end as StatusText : String,

    case
      when status = 'COMPLETED'    then 3
      when status = 'IN_PROGRESS'  then 2
      when status = 'ON_HOLD'      then 1
      when status = 'YET_TO_START' then 5
      else 0
    end as StatusCriticality : Integer,

    startDate,
    endDate,
    completionPercent,

    rollouts    : redirected to Rollouts,
    mockstreams : redirected to Mockstream
  };


  /* =======================
  Streams (Master Data)
  ======================= */
  @readonly
  entity Streams as projection on db.Streams {
    key id,
    name
  };


  /* =======================
    MockStreams
  ======================= */
  @readonly
  entity Mockstream as projection on db.MockStream {
    key mockStreamId,
    startDate,
    endDate,
    status,

    mock   : redirected to Mocks,
    stream : redirected to Streams,
    objects : redirected to MockStreamObjects
  };


  /* =======================
    Objects (Master Data)
  ======================= */
  @readonly
  entity Objects as projection on db.Objects {
    key id,
    name
  };


  /* =======================
    MockStreamObjects
  ======================= */
  @readonly
  entity MockStreamObjects as projection on db.MockStreamObjects {
    key ID,
      dataType,
      extractionMethod,
      transformationMethod,
      loadingMethod,
      totalRecords,
      recordsLoaded,
      remarks,
      startDate,
      endDate,
    mockStream : redirected to Mockstream,
    object     : redirected to Objects
  };

  entity Users as projection on db.Users{
      key ID,
    username,
    password,
    email,
    roles,
    active
    };

  action login(username: String, password: String) returns Boolean;

}
