import webpack, { DefinePlugin } from 'webpack';
import { Configuration } from 'webpack';
import { BuildOptions } from './types/types';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';

export function buildPlugins(options: BuildOptions): Configuration['plugins'] {
    const { mode, paths, analyzer, platform } = options;

    const isDev = mode === 'development';

    return [
        new HtmlWebpackPlugin({
            template: paths.html,
        }),
        new webpack.ProgressPlugin(),
        !isDev &&
            new MiniCssExtractPlugin({
                filename: 'css/[name].[contenthash:8].css',
                chunkFilename: 'css/[name].[contenthash:8].css',
            }),
        analyzer && new BundleAnalyzerPlugin(),
        isDev && new ForkTsCheckerWebpackPlugin(),
        isDev && new ReactRefreshWebpackPlugin(),
        // new DefinePlugin({
        //     platform,
        // }),
    ];
}
