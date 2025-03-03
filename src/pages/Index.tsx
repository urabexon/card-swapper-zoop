
import React from 'react';
import Board from '@/components/Board';
import { BoardType } from '@/types';

const Index = () => {
  // Sample initial board data
  const initialBoard: BoardType = {
    id: 'board-1',
    title: 'タスク ボード',
    columns: [
      {
        id: 'column-1',
        title: '未着手',
        cards: [
          {
            id: 'card-1',
            title: 'プロジェクトの計画を立てる',
            description: 'タイムラインと主要なマイルストーンを特定する',
            created: new Date('2023-06-15'),
            tags: ['高優先度']
          },
          {
            id: 'card-2',
            title: 'デザインのレビュー',
            description: 'チームからのフィードバックを受ける',
            created: new Date('2023-06-18'),
            tags: ['デザイン']
          }
        ]
      },
      {
        id: 'column-2',
        title: '進行中',
        cards: [
          {
            id: 'card-3',
            title: 'ユーザーインタビューの実施',
            description: '少なくとも5人のユーザーと会話する',
            created: new Date('2023-06-20'),
            tags: ['リサーチ']
          }
        ]
      },
      {
        id: 'column-3',
        title: '完了',
        cards: [
          {
            id: 'card-4',
            title: '競合分析',
            description: '市場の主要プレーヤーを調査する',
            created: new Date('2023-06-10'),
            tags: ['リサーチ', '完了']
          },
          {
            id: 'card-5',
            title: 'ワイヤーフレームの作成',
            description: '主要な画面のワイヤーフレームをスケッチする',
            created: new Date('2023-06-12'),
            tags: ['デザイン', '完了']
          }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <Board initialBoard={initialBoard} />
    </div>
  );
};

export default Index;
