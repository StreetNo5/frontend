import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import moment from 'moment';
import music1 from '../assets/SimpleSound.mp3';
import exampleImg from '../assets/example.png';
import  { ReactComponent as Send } from '../assets/Send.svg';
import { ReactComponent as Userimg } from '../assets/Userimg.svg';
import { ReactComponent as Player } from '../assets/player.svg';
import { ReactComponent as ContentImg } from '../assets/Contentimg.svg';
import { ReactComponent as Mark } from '../assets/Mark.svg';
import { ReactComponent as CommentImg } from '../assets/Commentimg.svg';
import { ReactComponent as Dot } from '../assets/Dot.svg';

function Header({comment} : any) {
  return(
    <div className = 'border-b-2 w-[390px] h-[56px]'>
        <button>{'<'}</button>
    </div>
  );
}

function Music({onStartPlay, onStopPlay, time, currentTime} : any) {

  return(
    <div className = 'w-[390px] h-[227px] relative'>
        <div className = 'w-[350px] h-[70px] absolute right-0'>
          <p className='text-[20px] mt-[10px]'>같이 감상하면 좋은 곡</p>
        </div>
        <div className = 'w-[350px] h-[157]px absolute right-0 bottom-[32px]' style={{ backgroundColor: '#DFDFDF'}} >
          <p className='text-[20px]'>song_name</p>
          <p className='text-[20px]'>artist_name</p>
          <p>{moment(time * 1000).format("mm:ss")}</p>
          <p>{moment(currentTime * 1000).format("mm:ss")}</p>
          <button onClick={onStartPlay} className=''>재생</button>
          <button onClick={onStopPlay} className=''>중단</button>
        </div>
    </div>
  );
}

function Content({data, userName} : any) {
  return(
    <>
      <div className='w-[350px] h-[10px] bg-st-gray-10 mt-[32px] ml-[40px]'/>
      <div className = 'w-[390px] h-[566px] relative'>
        <div className = 'w-[330px] h-[21px] absolute right-[20px]'>
          <p style={{borderLeft: '1px soild black'}}>May 21</p> 
          <p>{data}</p>
        </div>
        <div className = 'w-[330px] h-[60px] absolute top-[30px] right-[20px]'>
          <Userimg></Userimg>
          <p>{userName}</p>
        </div>
        <div className = 'w-[350px] h-[467px] absolute top-[100px] right-[0px]'>
          <ContentImg></ContentImg>
        </div>
      </div>
    </>
  );
}

function ImageInfo({tagList, info, location} : any) {
  return(
    <div className = 'w-[390px] h-[284px] relative mt-[32px] mb-[32px]'>
      <div className = 'w-[330px] h-[138px] absolute left-[40px]'>
        <div className = 'w-[330px] h-[26px]'>태그자리{tagList}</div>
        <div className = 'w-[330px] h-[96px] overflow-auto'>설명자리{info}</div>
      </div>
      <div className = 'w-[390px] h-[114px] absolute top-[170px]'>
        <div className = 'w-[330px] h-[70px] absolute left-[40px]'>
          <p className="absolute top-[20px] text-[20px]">이 장소는 어디인가요?</p></div>
        <div className = 'w-[330px] h-[44px] absolute top-[70px] left-[40px] border-2'>
          <Mark className="absolute top-[14px] left-[14px]" ></Mark>
          <span className = 'w-[281px] h-[24px] text-[16px] absolute left-[39px] top-[10px]'>수원시{location}</span>
        </div>
      </div>
    </div>
  );
}

function CommentListItem({comment} : any) {
  return(
    <div className = 'w-[390px] h-[216px] relative'>
      <div className = 'w-[350px] h-[60px]'>
        <CommentImg className = 'w-[60px] h-[60px]'></CommentImg>
        <div>
          <span>{'teo'}</span>
          <span>{'sprint'}</span>
        </div>
        <div>
          <Dot></Dot>
          <Dot></Dot>
        </div>
      </div>
      <div className = 'w-[350px] h-[84px]'>
        텍스트내용
      </div>
    </div>
  );
}

function CommentList({comment} : any) {
  return(
    <div><CommentListItem></CommentListItem></div>
  );
}

function CommentInput({newComment,  setNewComment} : any) {
  return(
    <div className = 'w-[390px] h-[85px] relative'>
      <form className = 'w-[350px] h-[48px] absolute left-[20px] top-[10px] bg-st-gray-02'> 
        <input className = 'w-[330px] h-[48px] bg-st-gray-02 px-[16px] focus:outline-none' placeholder='댓글을 입력하세요' value={newComment} onChange={(event) => { setNewComment(event.target.value);}}/>    
        <Send className = 'w-[24px] h-[24px] absolute right-[8px] top-[8px]' />
      </form>
    </div>
  );
}

function Comment({commentNum, newComment, setNewComment} : any) {
  return(
    <div>
        <div className = 'w-[390px] h-[70px] mt-[32px] mb-[32px] relative'>
          <p className="text-[20px] absolute left-[40px] top-[20px]">
          댓글 {commentNum}</p>
        </div>
        <CommentList></CommentList>
        <CommentInput></CommentInput>
    </div>
  );
}

function Detail() {
  const [audio] = useState(new Audio(music1));
  const [playing, setPlaying] = useState(false);
  const [songName, setSongName] = useState(false);
  const [artistName, setArtistName] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [comment, setComment] = useState([]);
  const [commentNum, setCommentNum] = useState(0);
  const [newComment, setNewComment] = useState('');
  const [totalTime, setTotalTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    playing ? audio.play() : audio.pause();
    if (playing){
      setTotalTime(audio.duration);
      audio.addEventListener('timeupdate',() => {   
        setCurrentTime(audio.currentTime);
      });
    }
  }, [playing]);

  const onStartPlay = () => {
    setPlaying(true);
  }

  const onStopPlay = () => {
    setPlaying(false)
  }

  return(
    <>
    <div style={{ width: '390px', height:'2079px', border: '1px solid black'}}>
      <Header></Header>
      <Music onStartPlay={onStartPlay} onStopPlay={onStopPlay} time={totalTime} currentTime={currentTime}></Music>
      <div className='w-[390px] h-[14px] bg-st-gray-02'></div>
      <Content></Content>
      <ImageInfo></ImageInfo>
      <div className='w-[390px] h-[14px] bg-st-gray-02'></div>
      <Comment commentNum={commentNum}></Comment>
      
    </div>
    </>
  );
}

export default Detail;